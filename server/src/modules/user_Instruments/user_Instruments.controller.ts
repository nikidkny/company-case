import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User_InstrumentsService } from './user_Instruments.service';
import { CreateUser_InstrumentDto } from './dto/create-user_Instrument.dto';
import { UpdateUser_InstrumentDto } from './dto/update-user_Instrument.dto';

@Controller('userInstruments')
export class User_InstrumentsController {
  constructor(
    private readonly user_InstrumentsService: User_InstrumentsService,
  ) {}

  @Post()
  create(@Body() createUserInstrumentDto: CreateUser_InstrumentDto) {
    return this.user_InstrumentsService.create(createUserInstrumentDto);
  }

  @Get()
  findAll() {
    return this.user_InstrumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.user_InstrumentsService.findOne(+id);
  }

  @Get('user/:userId')
  async getInstrumentsByUser(@Param('userId') userId: string) {
    return await this.user_InstrumentsService.findInstrumentsByUserId(userId);
  }
  @Get('excludeUser/:userId')
  async getInstrumentsExcludingUser(@Param('userId') userId: string) {
    return await this.user_InstrumentsService.findInstrumentsForAllExceptUser(
      userId,
    );
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUser_InstrumentDto: UpdateUser_InstrumentDto,
  ) {
    return this.user_InstrumentsService.update(+id, updateUser_InstrumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user_InstrumentsService.remove(+id);
  }
}
