import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetMembersDetailsDto } from './dto/get-members-details.dto';

@Injectable()
export class UsersService {
  //injecting the user model based on the schema we made
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {}

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  //creates a new user in the db in the users collection
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
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

  update(id: string) {}
  remove(id: string) {}
}
