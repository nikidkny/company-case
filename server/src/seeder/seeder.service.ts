import { Ensemble } from 'src/modules/ensembles/ensemble.entity';
import { Post } from 'src/modules/posts/post.entity';
import { User } from 'src/modules/users/user.entity';
import mockEnsembles from './mockEnsembles';
import mockPosts from './mockPosts';
import mockUsers from './mockUsers';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async seedDatabase() {
    try {
      // Seed Users
      const existingUsersCount = await this.userModel.countDocuments();
      if (existingUsersCount === 0) {
        await this.userModel.insertMany(mockUsers);
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
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
}
