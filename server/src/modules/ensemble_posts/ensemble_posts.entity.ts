import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type Ensemble_PostsDocument = HydratedDocument<Ensemble_Posts>;

@Schema()
export class Ensemble_Posts {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Ensemble', required: true })
  ensembleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Types.ObjectId;
}
export const Ensemble_PostsSchema =
  SchemaFactory.createForClass(Ensemble_Posts);
