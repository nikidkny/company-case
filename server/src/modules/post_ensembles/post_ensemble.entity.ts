import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type Post_EnsemblesDocument = HydratedDocument<Post_Ensembles>;

@Schema()
export class Post_Ensembles {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Ensemble', required: true })
  ensembleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Types.ObjectId;
}
export const Post_EnsemblesSchema =
  SchemaFactory.createForClass(Post_Ensembles);
