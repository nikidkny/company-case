import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  //injecting the user model based on the schema we made
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  findAll() {}
  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  //creates a new user in the db in the users collection
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  update(id: string) {
    return this.userModel.findByIdAndUpdate(id).exec();
  }
  remove(id: string) {}
}
