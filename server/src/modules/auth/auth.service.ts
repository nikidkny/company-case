import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async signup(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { firstName, lastName, email, password, confirmPassword, birthdate, isAvailable } =
      createUserDto;

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        throw new BadRequestException('Confirm Password do not match');
      }

      const userFound = await this.userModel.findOne({ email });

      // Check if a user already exists with the provided email
      if (userFound) {
        throw new BadRequestException('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for bcrypt

      // Create a new user
      const newUser = new this.userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthdate,
        isAvailable,
        createdAt: new Date(),
      });
      await newUser.save();

      return { message: 'User registered successfully' };
    } catch (error) {
      // Log the error in more detail
      console.error('Error during singup', error);
      if (error instanceof BadRequestException) {
        throw error;
      }

      // If it's an unexpected error, throw an internal server error
      throw new InternalServerErrorException(
        'An error occurred during the signup process. Please try again later.',
      );
    }
  }

  async handleLogin(email: string, password: string, req: Request, res: Response) {
    //TODO: 
    // - check if the user is already logged in before loggin in again and before issuing new tokens.

    // Check if the user is already logged in by verifying the refresh token
    const existingRefreshToken = req.cookies['refreshToken'];

    if (existingRefreshToken) {
      try {
        //TODO: add test if invalid token and logout users
        // Try to verify the refresh token
        jwt.verify(existingRefreshToken, process.env.JWT_REFRESH_SECRET);

        // check if already logged in 
        await this.alreadyLoggedIn(email, password);

        // If valid refresh token return 204 No Content:the request was successful, but there is no additional content to send in the response.
        return res.status(HttpStatus.OK).json({
          message: 'User is already logged',
        });
      } catch (e) {
        // Check if the error message is "Invalid credentials from logged in user"
        if (e.message === 'Invalid credentials from logged in user') {
          // Clear the cookies if the error is related to invalid credentials from a logged-in user
          res.clearCookie('accessToken'); // Clear the access token cookie
          res.clearCookie('refreshToken'); // Clear the refresh token cookie

          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Invalid credentials from logged in user, cookies cleared',
          });
        }

        // If refresh token is invalid, expired, or credentials don't match
        if (e instanceof NotFoundException || e instanceof BadRequestException) {
          // Send specific error messages in case of invalid credentials
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: e.message || 'Invalid credentials',
          });
        }

        // Handle any other unexpected errors
        console.log('Error during login check:', e);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An unexpected error occurred',
        });
      }
    }

    // If no valid refresh token, proceed with normal login
    try {
      await this.login(email, password, res);
      return res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unexpected error occurred during login',
      });
    }
  }

  async login(email: string, password: string, res: Response) {
    try {
      // Check if email and password are provided
      // Check if email and password are provided
      if (!email && !password) {
        throw new BadRequestException('Credentials must not be empty');
      }
      if (!email) {
        throw new BadRequestException('Email must not be empty');
      }
      if (!password) {
        throw new BadRequestException('Password must not be empty');
      }

      //Check if user exists
      const userFound = await this.userModel.findOne({ email });
      if (!userFound) {
        throw new NotFoundException('User not found');
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(
        password,
        userFound.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      // Create the payload for the JW
      const payload = { email: userFound.email, id: userFound._id };

      // Sign the JWT with the payload
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '60min',
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '1d',
      });

      // Set cookies with HTTP-only, Secure (optional for HTTPS), and SameSite for better security
      res.cookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: false, // Ensures the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict', // Prevents cross-site requests
      });

      res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: false, // Ensures the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict', // Prevents cross-site requests
      });

      return {
        message: 'Login successful',
      };
    } catch (error) {
      console.error('Error during login', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        console.error(error);
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async alreadyLoggedIn(email: string, password: string) {
    const userFound = await this.userModel.findOne({ email });
    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      userFound.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials from logged in user');
    }
  }

  async refreshToken(refreshToken: string, res: Response): Promise<{ accessToken: string }> {
    try {
      // Validate refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Find user by ID (stored in the payload)
      const user = await this.userModel.findById(payload.id);
      if (!user) {
        console.error("USER NOT FOUND")
        throw new NotFoundException('User not found');
      }

      // Issue a new access token
      const accessToken = this.jwtService.sign(
        { id: user.id, email: user.email },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1h' },
      );

      // Set the new access token in the response cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: false, // Accessible by frontend
        secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return { accessToken };
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
