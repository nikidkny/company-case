import { Injectable } from '@nestjs/common';
import { CreateUser_InstrumentDto } from './dto/create-user_Instrument.dto';
import { UpdateUser_InstrumentDto } from './dto/update-user_Instrument.dto';

@Injectable()
export class User_InstrumentsService {
  create(createUser_InstrumentDto: CreateUser_InstrumentDto) {
    return 'This action adds a new userInstrument';
  }

  findAll() {
    return `This action returns all userInstruments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInstrument`;
  }

  update(id: number, updateUser_InstrumentDto: UpdateUser_InstrumentDto) {
    return `This action updates a #${id} userInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInstrument`;
  }
}
