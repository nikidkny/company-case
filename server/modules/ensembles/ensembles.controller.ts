import { Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';

@Controller('ensembles')
export class EnsemblesController {
  @Get()
  findAll() {
    // Empty endpoint to get all ensembles
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Empty endpoint to get a single ensemble
  }

  @Post()
  create() {
    // Empty endpoint to create an ensemble
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
