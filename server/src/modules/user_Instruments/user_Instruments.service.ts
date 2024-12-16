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
    // Step 1: Find all user_instruments for the given userId
    const userInstruments = await this.userInstrumentModel
      .find({ userId })
      .exec();

    if (!userInstruments || userInstruments.length === 0) {
      return []; // Return empty array if no instruments found
    }

    // Step 2: Extract all instrument IDs
    const instrumentIds = userInstruments.map((ui) => ui.instrumentId);

    // Step 3: Fetch instruments by IDs
    const instruments = await this.instrumentModel
      .find({ _id: { $in: instrumentIds } })
      .exec();

    // Step 4: Combine instrument details with user_instrument data
    return userInstruments.map((ui) => {
      const instrument = instruments.find(
        (inst) => inst._id.toString() === ui.instrumentId.toString(),
      );
      return {
        instrumentId: ui.instrumentId,
        name: instrument?.name || 'Unknown',
        levelOfExperience: ui.levelOfExperience,
        genres: ui.genres,
      };
    });
  }
  update(id: number, updateUser_InstrumentDto: UpdateUser_InstrumentDto) {
    return `This action updates a #${id} userInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInstrument`;
  }
}
