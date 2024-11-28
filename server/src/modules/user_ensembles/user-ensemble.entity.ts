import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class User_Ensemble {
    _id: Types.ObjectId;
    @Prop({ required: true })
    user_id: string; //TODO: check if it is the right type
    @Prop({ required: true })
    ensemble_id: string;//TODO: check if it is the right type
    @Prop({ required: true })
    joined_at: Date;
}

export const User_EnsembleSchema = SchemaFactory.createForClass(User_Ensemble);