import { Module } from '@nestjs/common';
import { EnsemblesController } from './ensembles.controller';
import { EnsemblesService } from './ensembles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble, EnsembleSchema } from './ensemble.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
  ],
  controllers: [EnsemblesController],
  providers: [EnsemblesService],
  exports: [EnsemblesService],
})
export class EnsemblesModule {}
