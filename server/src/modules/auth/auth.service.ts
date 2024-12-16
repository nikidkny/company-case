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
    const existingRefreshToken = req.cookies?.['refreshToken'];

    // Check if the user is already logged in
    if (existingRefreshToken) {
      try {
        jwt.verify(existingRefreshToken, process.env.JWT_REFRESH_SECRET);
        await this.validateUser(email, password);

        // User is already logged in
        return res.status(HttpStatus.OK).json({ message: 'User is already logged in' });

      } catch (error) {
        console.error(error)

        if (error.message === 'Invalid credentials' || error.message === 'User not found') {
          console.error(error);
          // Clear cookies for invalid credentials
          this.logout(res);
          return res.status(HttpStatus.UNAUTHORIZED).json({
            message: 'Invalid credentials from logged-in user, cookies cleared',
          });
        }
        // For other errors, return a bad request
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.message,
        });
      }
    }

    // If no valid refresh token, proceed with normal login
    try {
      await this.login(email, password, res);
    } catch (error) {
      console.error('Error during login:', error);
      // Send appropriate error message
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }

      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An unexpected error occurred during login',
      });
    }
  }

  async login(email: string, password: string, res: Response) {
    try {
      // Validate user credentials
      const userFound = await this.validateUser(email, password);

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
      // Define common cookie options for both accessToken and refreshToken
      const cookieOptions = {
        httpOnly: process.env.NODE_ENV === 'production',  
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict' as 'strict' | 'lax' | 'none', // Explicitly typing sameSite to the correct string literals
      };

      res.cookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 1000, // 1 hour
        ...cookieOptions, // Spread the common options
      });

      res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        ...cookieOptions, // Spread the common options
      });

      // Send response directly
      res.status(HttpStatus.OK).json({ message: 'Login successful' });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async validateUser(email: string, password: string) {
    if (!email && !password) {
      throw new BadRequestException('Credentials must not be empty');
    }
    if (!email) {
      throw new BadRequestException('Email must not be empty');
    }
    if (!password) {
      throw new BadRequestException('Password must not be empty');
    }

    const user = await this.userModel.findOne({ email });
    if (!user) {
      console.log("Should print");

      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Should NOT print");
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  logout(res: Response) {
    // Clear both the accessToken and refreshToken cookies
    const cookieOptions = {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
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
