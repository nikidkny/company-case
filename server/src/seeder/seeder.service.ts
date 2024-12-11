
import { Ensemble } from 'src/modules/ensembles/ensemble.entity';
import { Post } from 'src/modules/posts/post.entity';
import { User } from 'src/modules/users/user.entity';
import mockEnsembles from './mockEnsembles';
import mockPosts from './mockPosts';
import mockUsers from './mockUsers';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) { }

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
      // Clear existing collections (optional)
      await this.userModel.deleteMany({});
      await this.ensembleModel.deleteMany({});
      await this.postModel.deleteMany({});

      // Hash passwords for mock users
      const usersWithHashedPasswords = await this.hashPasswordsForUsers(mockUsers);

      // Insert mock data into collections
      await this.userModel.insertMany(usersWithHashedPasswords);
      console.log(`${usersWithHashedPasswords.length} users have been added to the database.`);

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
