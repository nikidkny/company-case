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
import { GetMembersDetailsDto } from './dto/get-members-details.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    // Empty endpoint to get all users
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Get a user by id
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('details')
  async getMembersDetails(@Body() getMembersDetailsDto: GetMembersDetailsDto) {
    const { membersIds, creatorId } = getMembersDetailsDto;
    return this.usersService.getMembersDetails({ membersIds, creatorId });
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    // Endpoint to update a logged in user
    return this.usersService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Empty endpoint to delete a user
  }
}
