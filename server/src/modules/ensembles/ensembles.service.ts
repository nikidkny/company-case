import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ensemble } from './ensemble.entity';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';

@Injectable()
export class EnsemblesService {
  constructor(
    @InjectModel(Ensemble.name) private ensembleModel: Model<Ensemble>,
  ) {}

  async findAll(): Promise<Ensemble[]> {
    return this.ensembleModel.find().exec();
  }
  async findOne(id: string): Promise<Ensemble> {
    return this.ensembleModel.findById(id);
  }

  async create(createEnsembleDto: CreateEnsembleDto): Promise<Ensemble> {
    try {
      const createdEnsemble = new this.ensembleModel(createEnsembleDto);
      return await createdEnsemble.save();
    } catch (error) {
      throw new Error(`Failed to create ensemble: ${error.message}`);
    }
  }
  update(id: string) {}
  remove(id: string) {}
  async findAllByUser(userId: string): Promise<Ensemble[]> {
    return this.ensembleModel
      .find({
        $or: [{ createdBy: userId }, { memberList: userId }],
      })
      .exec();
  }
}
