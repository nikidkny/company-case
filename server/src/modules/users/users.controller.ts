import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    // Empty endpoint to get all users
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Empty endpoint to get a single user
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
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
