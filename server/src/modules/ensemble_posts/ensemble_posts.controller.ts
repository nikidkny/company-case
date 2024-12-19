import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Ensemble_PostsService } from './ensemble_posts.service';
import { CreateEnsemble_PostsDto } from './dto/create-ensemble_posts.dto';
import { UpdateEnsemble_PostsDto } from './dto/update-ensemble_posts.dto';

@Controller('ensemblePosts')
export class Ensemble_PostsController {
  constructor(private readonly ensemble_PostsService: Ensemble_PostsService) {}

  @Post()
  async create(@Body() createEnsemblePostsDto: CreateEnsemble_PostsDto) {
    return this.ensemble_PostsService.create(createEnsemblePostsDto);
  }

  @Get()
  findAll() {
    return this.ensemble_PostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ensemble_PostsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnsemble_PostsDto: UpdateEnsemble_PostsDto,
  ) {
    return this.ensemble_PostsService.update(+id, updateEnsemble_PostsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ensemble_PostsService.remove(+id);
  }
}
