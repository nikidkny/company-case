//db schema for user
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EnsembleDocument = HydratedDocument<Ensemble>;

@Schema()
export class Ensemble {
  _id: Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop()
  memberList: string[];
  @Prop()
  createdBy: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  numberOfMembers: number;
  @Prop()
  location: string;
  @Prop({ required: true })
  sessionFrequency: string;
  @Prop()
  genre: string[];
  @Prop({ required: true })
  isPermanent: boolean;
  @Prop()
  image: string;
  @Prop({ required: true })
  activeMusicians: string;
  @Prop()
  webpage: string;
  @Prop()
  createdAt: Date;
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
