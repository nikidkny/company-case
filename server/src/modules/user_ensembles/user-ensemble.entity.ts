import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User_Ensemble {
  _id: Types.ObjectId;
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  ensembleId: string;
  @Prop({ required: true })
  joinedAt: Date;
}

export const User_EnsembleSchema = SchemaFactory.createForClass(User_Ensemble);
