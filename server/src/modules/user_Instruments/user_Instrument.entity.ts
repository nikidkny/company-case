import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type User_InstrumentDocument = HydratedDocument<User_Instrument>;

@Schema()
export class User_Instrument {
  _id: Types.ObjectId;
  @Prop({ required: true })
  levelOfExperience: string;
  @Prop({ required: true })
  genre: string[];
}
export const User_InstrumentSchema =
  SchemaFactory.createForClass(User_Instrument);
