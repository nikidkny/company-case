import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetMembersDetailsDto } from './dto/get-members-details.dto';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  //injecting the user model based on the schema we made
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async findAll(excludedUserId: string): Promise<User[]> {
    return await this.userModel
      .find({
        _id: { $ne: new Types.ObjectId(excludedUserId) }, // Exclude logged-in user
        isAvailable: true, // Only available users
      })
      .exec();
  }
  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  //creates a new user in the db in the users collection
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto, res: Response, req: Request): Promise<User> {
    try {

      const cookies = req.headers.cookie;
    if (!cookies) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Cookies not found',
      });
      return; 
    }

    const accessToken = cookies
      .split('; ')
      .find((cookie) => cookie.startsWith('accessToken='))
      ?.split('=')[1];

    if (!accessToken) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Access token not found in cookies',
      });
      return;
    }

    // Decode the access token
    const secretKey = process.env.JWT_SECRET || 'defaultSecret'; // Replace with your JWT secret
    const decoded = jwt.verify(accessToken, secretKey) as { email: string };

    const currentEmail = decoded.email;

    if (!currentEmail) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Email not found in token',
      });
      return;
    }

    const { email } = updateUserDto;

    if (currentEmail !== email) {
      const userFound = await this.userModel.findOne({ email });

      if (userFound) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid email',
        });
        return;
      }
    }

      return this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
    } catch (error) {
      console.error(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error,
      });
    }
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
  }
  //takes an array of userIds and finds each user + creator
  async getMembersDetails({
    membersIds,
    creatorId,
  }: GetMembersDetailsDto): Promise<any> {
    const membersObjectIds = membersIds.map((id) => new Types.ObjectId(id));

    const foundMembers = await this.userModel
      .find({ _id: { $in: membersObjectIds } })
      .exec();

    const creator = await this.userModel.findById(creatorId).exec();

    const foundResults = { foundMembers, creator };
    console.log('foundResults', foundResults);
    return foundResults;
  }
}
