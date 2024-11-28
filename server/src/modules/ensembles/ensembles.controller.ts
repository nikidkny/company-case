import {
  Controller,
  Get,
  Body,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';

@Controller('ensembles')
export class EnsemblesController {
  constructor(private readonly ensembleService: EnsemblesService) {}
  @Get()
  async findAll() {
    return await this.ensembleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ensembleService.findOne(id);
  }

  @Post()
  async create(@Body() createEnsembleDto: CreateEnsembleDto) {
    return await this.ensembleService.create(createEnsembleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    // Empty endpoint to update an ensemble
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Empty endpoint to delete an ensemble
  }
}
