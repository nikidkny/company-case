//db schema for user
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  _id: Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  type: string;

  //if the type of post is "looking for a musician.." then the post will display the ensemble name in the "createdBy" otherwise we display the user by default
  @Prop()
  createdBy: string;
  @Prop()
  isReported: boolean;

  //the instrument should be a selection from a drop down menu
  @Prop({ required: true })
  instrument: string;
  @Prop()
  experienceRequired: string;
  @Prop()
  webPage: string;
  @Prop()
  createdAt: Date;
  @Prop()
  deletedAt: Date;
  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
