import { Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  findAll() {
    // Empty endpoint to get all posts
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Empty endpoint to get a single post
  }

  @Post()
  create() {
    // Empty endpoint to create a post
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
