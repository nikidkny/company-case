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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetMembersDetailsDto } from './dto/get-members-details.dto';
import { Request, Response} from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
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
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.usersService.create(createUserDto);
  }

  //TODO: check if new email is already taken
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    await this.usersService.update(id, updateUserDto, res,req);
    return res.status(HttpStatus.OK).json({
      message: 'User details updated successfully',
    });
  }
  @Post('details')
  async getMembersDetails(@Body() getMembersDetailsDto: GetMembersDetailsDto) {
    const { membersIds, creatorId } = getMembersDetailsDto;
    return this.usersService.getMembersDetails({ membersIds, creatorId });
  }
}
