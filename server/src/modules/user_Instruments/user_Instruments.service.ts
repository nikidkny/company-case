import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser_InstrumentDto } from './dto/create-user_Instrument.dto';
import { UpdateUser_InstrumentDto } from './dto/update-user_Instrument.dto';
import {
  User_Instrument,
  User_InstrumentDocument,
} from './user_Instrument.entity';
import {
  Instrument,
  InstrumentDocument,
} from '../instruments/instrument.entity';

@Injectable()
export class User_InstrumentsService {
  constructor(
    @InjectModel(User_Instrument.name)
    private userInstrumentModel: Model<User_InstrumentDocument>,
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>,
  ) {}

  async create(
    createUser_InstrumentDto: CreateUser_InstrumentDto,
  ): Promise<User_Instrument> {
    const createdUserInstrument = new this.userInstrumentModel(
      createUser_InstrumentDto,
    );
    return createdUserInstrument.save();
  }

  findAll() {
    return `This action returns all userInstruments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInstrument`;
  }
  // Find instruments by user ID
  async findInstrumentsByUserId(userId: string): Promise<any[]> {
    const result = await this.userInstrumentModel
      .aggregate([
        { $match: { userId: userId } }, // Match user-specific instruments
        {
          $addFields: {
            instrumentIdAsObjectId: { $toObjectId: '$instrumentId' }, // Convert instrumentId to ObjectId
          },
        },
        {
          $lookup: {
            from: 'instruments', // The name of the collection for Instrument
            localField: 'instrumentIdAsObjectId', // The field in the User_Instrument collection
            foreignField: '_id', // The field in the Instrument collection
            as: 'instrumentDetails', // The name of the array to store the lookup results
          },
        },
        { $unwind: '$instrumentDetails' }, // Flatten the lookup array
        {
          $project: {
            userId: 1, // Include the user ID
            instrumentId: 1, // Include the instrument ID
            levelOfExperience: 1, // Include the level of experience
            genres: 1, // Include the genres
            name: '$instrumentDetails.name', // Include the instrument name
          },
        },
      ])
      .exec();

    return result;
  }

  update(id: number, updateUser_InstrumentDto: UpdateUser_InstrumentDto) {
    return `This action updates a #${id} userInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInstrument`;
  }
}
