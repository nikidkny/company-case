import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Post_EnsemblesService } from './post_ensembles.service';
import { CreatePost_EnsemblesDto } from './dto/create-post_ensemble.dto';
import { UpdatePost_EnsemblesDto } from './dto/update-post_ensemble.dto';

@Controller('postEnsembles')
export class Post_EnsemblesController {
  constructor(private readonly post_EnsemblesService: Post_EnsemblesService) {}

  @Post()
  async create(@Body() createPostEnsemblesDto: CreatePost_EnsemblesDto) {
    return this.post_EnsemblesService.create(createPostEnsemblesDto);
  }

  @Get()
  findAll() {
    return this.post_EnsemblesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.post_EnsemblesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePost_EnsemblesDto: UpdatePost_EnsemblesDto,
  ) {
    return this.post_EnsemblesService.update(+id, updatePost_EnsemblesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.post_EnsemblesService.remove(+id);
  }
}
