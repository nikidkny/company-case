import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../posts/post.entity';
import {
  Ensemble_Posts,
  Ensemble_PostsDocument,
} from '../ensemble_posts/ensemble_posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Ensemble_Posts.name)
    private ensemblePostsModel: Model<Ensemble_PostsDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}
  async findAll(): Promise<any[]> {
    const posts = await this.postModel.find().exec();
    const ensemblePosts = await this.ensemblePostsModel
      .find()
      .populate('ensembleId') // Ensure this populates the ensemble details
      .exec();

    // Map posts with their ensembles
    return posts.map((post) => {
      const ensemblePost = ensemblePosts.find(
        (ep) => ep.postId.toString() === post._id.toString(),
      );
      return {
        post,
        ensemble: ensemblePost?.ensembleId || null,
      };
    });
  }

  async findTest() {
    return 'Test';
  }
  findOne(id: string) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const createdPost = new this.postModel(createPostDto);
      return await createdPost.save();
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  update(id: string) {}
  remove(id: string) {}
}
