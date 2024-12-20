import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User_Ensemble } from './user-ensemble.entity';
import { Ensemble } from '../ensembles/ensemble.entity';
import { User } from '../users/user.entity';

@Injectable()
export class UserEnsembleService {
  constructor(
    @InjectModel(User_Ensemble.name)
    private userEnsembleModel: Model<User_Ensemble>,
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async addUserToEnsemble(userId: string, ensembleId: string): Promise<void> {
    const joinedAt = new Date();

    // Check if user is already in the ensemble
    const userAlreadyInEnsemble = await this.userEnsembleModel.findOne({
      userId: userId,
      ensembleId: ensembleId,
    });
    if (userAlreadyInEnsemble) {
      throw new ConflictException('User is already a member of this ensemble.');
    }

    try {
      // Retrieve the ensemble to check its current state
      const ensemble = await this.ensembleModel.findById(ensembleId);
      if (!ensemble) {
        throw new NotFoundException('Ensemble not found.');
      }

      console.log('Current Ensemble:', ensemble);

      // Check if the user is already in the member list
      if (ensemble.memberList.includes(userId)) {
        throw new ConflictException(
          'User is already in the ensemble member list.',
        );
      }

      // Check and update the member_list
      ensemble.memberList.push(userId);
      // Add to user_ensemble collection
      await this.userEnsembleModel.create({
        userId: userId,
        ensembleId: ensembleId,
        joinedAt: joinedAt,
      });

      await ensemble.save(); // Save the updated ensemble document
    } catch (error) {
      // Log and throw an error for unexpected issues
      console.error('Error adding user to ensemble:', error);
      throw new Error('Failed to add user to ensemble.');
    }
  }

  async checkUserEnsemble(
    userId: string,
    ensembleId: string,
  ): Promise<boolean> {
    const existingRelation = await this.userEnsembleModel.findOne({
      userId: userId,
      ensembleId: ensembleId,
    });

    return !!existingRelation;
  }

  async checkUser(userId: string): Promise<boolean> {
    // Convert the userId to ObjectId if it is a valid string representation of an ObjectId
    const objectId = Types.ObjectId.isValid(userId)
      ? new Types.ObjectId(userId)
      : null;

    // Check if the user exists using the converted ObjectId
    if (!objectId) {
      return false;
    }

    const userFound = await this.userModel.findOne({
      _id: objectId,
    });

    return !!userFound;
  }

  async checkEnsemble(ensembleId: string): Promise<boolean> {
    // Convert the userId to ObjectId if it is a valid string representation of an ObjectId
    const objectId = Types.ObjectId.isValid(ensembleId)
      ? new Types.ObjectId(ensembleId)
      : null;

    // Check if the user exists using the converted ObjectId
    if (!objectId) {
      return false;
    }

    const ensembleFound = await this.ensembleModel.findOne({
      _id: objectId,
    });

    return !!ensembleFound;
  }
}
