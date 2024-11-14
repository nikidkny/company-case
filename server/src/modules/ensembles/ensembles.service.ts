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
  findAll() {}
  findOne(id: string) {}

  async create(createEnsembleDto: CreateEnsembleDto): Promise<Ensemble> {
    const createdEnsemble = new this.ensembleModel(createEnsembleDto);
    return createdEnsemble.save();
  }
  update(id: string) {}
  remove(id: string) {}
}
