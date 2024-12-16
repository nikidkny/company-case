import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser_InstrumentDto } from './dto/create-user_Instrument.dto';
import { UpdateUser_InstrumentDto } from './dto/update-user_Instrument.dto';
import {
  User_Instrument,
  User_InstrumentDocument,
} from './user_Instrument.entity';

@Injectable()
export class User_InstrumentsService {
  constructor(
    @InjectModel(User_Instrument.name)
    private userInstrumentModel: Model<User_InstrumentDocument>,
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
  async findByUserId(userId: string): Promise<User_Instrument[]> {
    return this.userInstrumentModel.find({ userId }).exec();
  }
  update(id: number, updateUser_InstrumentDto: UpdateUser_InstrumentDto) {
    return `This action updates a #${id} userInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInstrument`;
  }
}
