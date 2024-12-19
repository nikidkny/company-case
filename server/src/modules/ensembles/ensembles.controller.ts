import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './dto/update-ensemble.dto';

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEnsembleDto: UpdateEnsembleDto,
  ) {
    try {
      //return { message: `PUT route reached for ${id}` };
      return await this.ensembleService.update(id, updateEnsembleDto);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(
        `Failed to update ensemble: ${error.message}`,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Empty endpoint to delete an ensemble
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.ensembleService.findAllByUser(userId);
  }
}
