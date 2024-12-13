import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
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
