import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User_Ensemble } from "./user-ensemble.entity";
import { Ensemble } from "../ensembles/ensemble.entity";

@Injectable()
export class UserEnsembleService {
  constructor(
    @InjectModel(User_Ensemble.name) private userEnsembleModel: Model<User_Ensemble>,
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
  ) {}

  testEndpoint(): { status: string; message: string } {
    return {
      status: 'success',
      message: 'Service is working',
    };
  }

  async addUserToEnsemble(userId: string, ensembleId: string): Promise<void> {
    const joinedAt = new Date();

    // Log all parameters
    console.log(userId, ensembleId, joinedAt);

    // TODO: Insert into user_ensemble collection
    // await this.userEnsembleModel.create({ userId, ensembleId, joinedAt });

    // TODO: Update member_list in ensemble collection
    /*
    await this.ensembleModel.updateOne(
      { _id: ensembleId },
      { $addToSet: { member_list: userId } }, // Ensure no duplicates
    );
    */
  }
}
