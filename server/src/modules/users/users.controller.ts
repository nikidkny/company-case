import { Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    // Empty endpoint to get all users
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Empty endpoint to get a single user
  }

  @Post()
  create() {
    // Empty endpoint to create a user
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    // Empty endpoint to update a user
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Empty endpoint to delete a user
  }
}
