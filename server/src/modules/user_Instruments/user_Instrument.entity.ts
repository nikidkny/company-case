import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type User_InstrumentDocument = HydratedDocument<User_Instrument>;

@Schema()
export class User_Instrument {
  _id: Types.ObjectId;
  //reference to the User and Instrument via id (FK)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Instrument', required: true })
  instrumentId: Types.ObjectId;
  // @Prop({ required: true })
  // name: string;
  @Prop({ required: true })
  levelOfExperience: string;
  @Prop({ required: true })
  genres: string[];
}
export const User_InstrumentSchema =
  SchemaFactory.createForClass(User_Instrument);
