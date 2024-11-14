import { Model } from 'mongoose';
import { Ensemble } from 'src/modules/ensembles/ensemble.entity';
import { Post } from 'src/modules/posts/post.entity';
import { User } from 'src/modules/users/user.entity';
import mockEnsembles from './mockEnsembles';
import mockPosts from './mockPosts';
import mockUsers from './mockUsers';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async seedDatabase() {
    try {
      // Clear existing collections (optional)
      await this.userModel.deleteMany({});
      await this.ensembleModel.deleteMany({});
      await this.postModel.deleteMany({});

      // Insert mock data into collections
      await this.userModel.insertMany(mockUsers);
      console.log(`${mockUsers.length} users have been added to the database.`);

      await this.ensembleModel.insertMany(mockEnsembles);
      console.log(
        `${mockEnsembles.length} ensembles have been added to the database.`,
      );

      await this.postModel.insertMany(mockPosts);
      console.log(`${mockPosts.length} posts have been added to the database.`);
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
}
