import { Injectable } from '@nestjs/common';
import { CreatePost_EnsemblesDto } from './dto/create-post_ensemble.dto';
import { UpdatePost_EnsemblesDto } from './dto/update-post_ensemble.dto';
import { Post_Ensembles, Post_EnsemblesDocument } from './post_ensemble.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class Post_EnsemblesService {
  constructor(
    @InjectModel(Post_Ensembles.name)
    private postEnsemblesModel: Model<Post_EnsemblesDocument>,
  ) {}

  async create(
    createPost_EnsemblesDto: CreatePost_EnsemblesDto,
  ): Promise<Post_Ensembles> {
    const createdPostEnsemble = new this.postEnsemblesModel(
      createPost_EnsemblesDto,
    );
    console.log(createdPostEnsemble);
    return createdPostEnsemble.save();
  }

  findAll() {
    return `This action returns all postEnsembles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postEnsemble`;
  }

  update(id: number, updatePost_EnsemblesDto: UpdatePost_EnsemblesDto) {
    return `This action updates a #${id} postEnsemble`;
  }

  remove(id: number) {
    return `This action removes a #${id} postEnsemble`;
  }
}
