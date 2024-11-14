import { PartialType } from '@nestjs/mapped-types';
import { CreateUser_InstrumentDto } from './create-user_Instrument.dto';

export class UpdateUser_InstrumentDto extends PartialType(
  CreateUser_InstrumentDto,
) {}
