//db schema for user
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  description: string;
  @Prop()
  birthdate: Date;
  @Prop()
  address: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  image: string;
  @Prop()
  lastLoggedIn: Date;
  @Prop()
  createdAt: Date;
  @Prop({ required: true })
  isAvailable: boolean;
  @Prop()
  isNewsletter: boolean;
  @Prop()
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
