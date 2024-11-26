import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async signup(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { firstName, lastName, email, password, birthdate, isAvailable } = createUserDto;

    try {
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
        throw error;  // Re-throw the existing BadRequestException
      }

      // If it's an unexpected error, throw an internal server error
      throw new InternalServerErrorException('An error occurred during the signup process. Please try again later.');
    }
  }

  async login(email: string, password: string, res: Response) {
    try {
      //Check if user exists
      const userFound = await this.userModel.findOne({ email });
      if (!userFound) {
        throw new NotFoundException('User not found');
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, userFound.password);
      if (!isPasswordValid) {
        console.log("NOT SAME PASSWORD");

        throw new BadRequestException('Invalid credentials');
      }

      // Create the payload for the JW
      const payload = { email: userFound.email, sub: userFound._id };

      // Sign the JWT with the payload 
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '60min'
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '1d'
      })

      // Set cookies with HTTP-only, Secure (optional for HTTPS), and SameSite for better security
      res.cookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: false,          // Ensures the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production' ? true : false, 
        sameSite: 'strict',      // Prevents cross-site requests
      });
      
      res.cookie('refreshCode', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: false,              // Ensures the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production' ? true : false, 
        sameSite: 'strict',          // Prevents cross-site requests
      });

      return {
        message: 'Login successful',
      };
    } catch (error) {
      console.error('Error during login', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async refreshToken(refreshToken: string) {
    try {

      //Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET
      });

      const user = await this.userModel.findById(payload.sub);

      //Generate new acess token
      const newAccessToken = this.jwtService.sign(
        { email: user.email, sub: user.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '60m'
        }
      );

      return {
        accessToken: newAccessToken
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token')
    }

  }
}
