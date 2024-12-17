import { Module } from '@nestjs/common';
import { User_InstrumentsService } from './user_Instruments.service';
import { User_InstrumentsController } from './user_Instruments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User_Instrument,
  User_InstrumentSchema,
} from './user_Instrument.entity';
import { Instrument, InstrumentSchema } from '../instruments/instrument.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User_Instrument.name, schema: User_InstrumentSchema },
      { name: Instrument.name, schema: InstrumentSchema },
    ]),
  ],
  controllers: [User_InstrumentsController],
  providers: [User_InstrumentsService],
  exports: [User_InstrumentsService],
})
export class User_InstrumentsModule {}
