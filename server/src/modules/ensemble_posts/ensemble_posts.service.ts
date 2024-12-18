import { Injectable } from '@nestjs/common';
import { CreateEnsemble_PostsDto } from './dto/create-ensemble_posts.dto';
import { UpdateEnsemble_PostsDto } from './dto/update-ensemble_posts.dto';
import {
  Ensemble_Posts,
  Ensemble_PostsDocument,
} from './ensemble_posts.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class Ensemble_PostsService {
  constructor(
    @InjectModel(Ensemble_Posts.name)
    private ensemblePostsModel: Model<Ensemble_PostsDocument>,
  ) {}

  async create(
    createEnsemble_PostsDto: CreateEnsemble_PostsDto,
  ): Promise<Ensemble_Posts> {
    const createdEnsemblePost = new this.ensemblePostsModel(
      createEnsemble_PostsDto,
    );
    console.log(createdEnsemblePost);
    return createdEnsemblePost.save();
  }

  findAll() {
    return `This action returns all postEnsembles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postEnsemble`;
  }

  update(id: number, updateEnsemble_PostsDto: UpdateEnsemble_PostsDto) {
    return `This action updates a #${id} postEnsemble`;
  }

  remove(id: number) {
    return `This action removes a #${id} postEnsemble`;
  }
}
