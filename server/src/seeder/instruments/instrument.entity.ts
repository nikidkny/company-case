//db schema for user
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InstrumentDocument = HydratedDocument<Instrument>;

@Schema({ timestamps: true })
export class Instrument {
  _id: Types.ObjectId;
  @Prop({ required: true, unique: true })
  name: string;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
