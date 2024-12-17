import { Test, TestingModule } from '@nestjs/testing';
import { User_InstrumentsController } from './user_Instruments.controller';
import { User_InstrumentsService } from './user_Instruments.service';

describe('UserInstrumentsController', () => {
  let controller: User_InstrumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [User_InstrumentsController],
      providers: [User_InstrumentsService],
    }).compile();

    controller = module.get<User_InstrumentsController>(
      User_InstrumentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  //TO dO: Add test for getting instruments by user ID
});
