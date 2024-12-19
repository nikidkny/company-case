import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetMembersDetailsDto } from './dto/get-members-details.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) {
    // Get all users except the logged-in user
    const userId = req.user.userId;
    return this.usersService.findAll(userId);
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }
  @Post('details')
  async getMembersDetails(@Body() getMembersDetailsDto: GetMembersDetailsDto) {
    const { membersIds, creatorId } = getMembersDetailsDto;
    return this.usersService.getMembersDetails({ membersIds, creatorId });
  }
}
