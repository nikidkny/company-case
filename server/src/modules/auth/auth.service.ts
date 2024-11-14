import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

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
      console.error('Error during singup',error);
      if (error instanceof BadRequestException) {
        throw error;  // Re-throw the existing BadRequestException
      }
  
      // If it's an unexpected error, throw an internal server error
      throw new InternalServerErrorException('An error occurred during the signup process. Please try again later.');
    }
  }

  async login(email: string, password: string) {
    try {
      //Check if user exists
      const userFound = await this.userModel.findOne({ email });
      if (!userFound) {
        throw new NotFoundException('User not found');
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, userFound.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      // Create the payload for the JW
      const payload = { email: userFound.email, sub: userFound._id };
      // Sign the JWT with the payload and return it
      const accessToken = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        accessToken
      }
    } catch {
      console.error('Error during login', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; 
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  logout() { }
  refresh() { }
}
