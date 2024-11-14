import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async signup(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { firstName, lastName, email, password, birthdate, isAvailable } = createUserDto;

    try {
      const userFound = await this.userModel.findOne({ email });
      if (userFound) {
        console.log('User already exists:', userFound);
        throw new BadRequestException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

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
      console.error('Error during signup:', error);
      throw error; // re-throw the error to handle in the global error handler
    }
  }

  login() { }
  logout() { }
  refresh() { }
}
