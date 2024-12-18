import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type User_InstrumentDocument = HydratedDocument<User_Instrument>;

@Schema()
export class User_Instrument {
  _id: Types.ObjectId;
  //reference to the User and Instrument via id (FK)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Instrument', required: true })
  @Transform(({ value }) => value.toString()) // transform it to make sure it's a string
  instrumentId: Types.ObjectId | string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  levelOfExperience: number;
  @Prop({ required: true })
  genres: string[];
}
export const User_InstrumentSchema =
  SchemaFactory.createForClass(User_Instrument);
