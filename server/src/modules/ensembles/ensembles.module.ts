import { Module } from '@nestjs/common';
import { EnsemblesController } from './ensembles.controller';
import { EnsemblesService } from './ensembles.service';

@Module({
  controllers: [EnsemblesController],
  providers: [EnsemblesService],
})
export class EnsemblesModule {}
