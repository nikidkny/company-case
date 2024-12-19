import {
  Controller,
  Get,
  Body,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    // Empty endpoint to update a post
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Empty endpoint to delete a post
  }
}
