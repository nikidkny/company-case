import { Ensemble } from 'src/modules/ensembles/ensemble.entity';
import { Post } from 'src/modules/posts/post.entity';
import { User } from 'src/modules/users/user.entity';
import { User_Instrument } from 'src/modules/user_Instruments/user_Instrument.entity';
import { Ensemble_Posts } from 'src/modules/ensemble_posts/ensemble_posts.entity';
import { Instrument } from 'src/modules/instruments/instrument.entity';
import { User_Ensemble } from 'src/modules/user_ensembles/user-ensemble.entity';
import mockEnsembles from './mockEnsembles';
import mockPosts from './mockPosts';
import mockUsers from './mockUsers';
import mockEnsemblePosts from './mockEnsemblePosts';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import mockUserEnsemble from './mockUserEnsemble';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User_Instrument.name)
    private userInstrumentModel: Model<User_Instrument>,
    @InjectModel(Ensemble_Posts.name)
    private ensemblePostsModel: Model<Ensemble_Posts>,
    @InjectModel(Instrument.name) private instrumentModel: Model<any>,
    @InjectModel(User_Ensemble.name)
    private userEnsembleModel: Model<User_Ensemble>,
  ) {}

  // Hash passwords for users
  private async hashPasswordsForUsers(users: any[]) {
    const saltRounds = 10; // Set number of salt rounds for bcrypt
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
      }),
    );
    return usersWithHashedPasswords;
  }

  async seedDatabase() {
    try {
      // Fetch Instruments from the database
      const instruments = await this.instrumentModel.find().exec();
      // Seed Users
      // Hash passwords for mock users
      const usersWithHashedPasswords =
        await this.hashPasswordsForUsers(mockUsers);
      const existingUsersCount = await this.userModel.countDocuments();
      if (existingUsersCount === 0) {
        await this.userModel.insertMany(usersWithHashedPasswords);
        console.log(
          `${mockUsers.length} users have been added to the database.`,
        );
      } else {
        console.log(
          `Users already exist in the database. Skipping user seeding.`,
        );
      }

      // Seed Ensembles
      const existingEnsemblesCount = await this.ensembleModel.countDocuments();
      if (existingEnsemblesCount === 0) {
        await this.ensembleModel.insertMany(mockEnsembles);
        console.log(
          `${mockEnsembles.length} ensembles have been added to the database.`,
        );
      } else {
        console.log(
          `Ensembles already exist in the database. Skipping ensemble seeding.`,
        );
      }

      // Seed Posts
      const existingPostsCount = await this.postModel.countDocuments();
      if (existingPostsCount === 0) {
        await this.postModel.insertMany(mockPosts);
        console.log(
          `${mockPosts.length} posts have been added to the database.`,
        );
      } else {
        console.log(
          `Posts already exist in the database. Skipping post seeding.`,
        );
      }

      // Seed User Instruments
      const existingUserInstrumentsCount =
        await this.userInstrumentModel.countDocuments();
      if (existingUserInstrumentsCount === 0) {
        const mockUserInstruments = [
          {
            _id: new Types.ObjectId(),
            userId: mockUsers[0]._id.toString(),
            instrumentId: instruments[0]._id.toString(),
            name: instruments[0].name,
            levelOfExperience: 3,
            genres: ['Rock', 'Blues'],
          },
          {
            _id: new Types.ObjectId(),
            userId: mockUsers[1]._id.toString(),
            instrumentId: instruments[1]._id.toString(),
            name: instruments[1].name,
            levelOfExperience: 5,
            genres: ['Classical', 'Jazz'],
          },
          {
            _id: new Types.ObjectId(),
            userId: mockUsers[2]._id.toString(),
            instrumentId: instruments[2]._id.toString(),
            name: instruments[2].name,
            levelOfExperience: 2,
            genres: ['Pop', 'Rock'],
          },
          {
            _id: new Types.ObjectId(),
            userId: mockUsers[3]._id.toString(),
            instrumentId: instruments[3]._id.toString(),
            name: instruments[3].name,
            levelOfExperience: 4,
            genres: ['Metal', 'Rock'],
          },
        ];
        await this.userInstrumentModel.insertMany(mockUserInstruments);
        console.log(
          `${mockUserInstruments.length} user instruments have been added to the database.`,
        );
      } else {
        console.log(
          `User instruments already exist in the database. Skipping user instrument seeding.`,
        );
      }

      // Seed Ensemble Posts
      const existingEnsemblePostsCount =
        await this.ensemblePostsModel.countDocuments();
      if (existingEnsemblePostsCount === 0) {
        await this.ensemblePostsModel.insertMany(mockEnsemblePosts);
        console.log(
          `${mockEnsemblePosts.length} ensemble posts have been added to the database.`,
        );
      } else {
        console.log(
          `Ensemble posts already exist in the database. Skipping ensemble post seeding.`,
        );
      }
      // Seed User Ensembles
      const existingUserEnsemblesCount =
        await this.userEnsembleModel.countDocuments();
      if (existingUserEnsemblesCount === 0) {
        await this.userEnsembleModel.insertMany(mockUserEnsemble);
        console.log(
          `${mockUserEnsemble.length} user ensembles have been added to the database.`,
        );
      } else {
        console.log(
          `User ensembles already exist in the database. Skipping user ensemble seeding.`,
        );
      }
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
}
