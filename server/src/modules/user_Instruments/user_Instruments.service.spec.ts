import { Test, TestingModule } from '@nestjs/testing';
import { User_InstrumentsService } from './user_Instruments.service';

describe('UserInstrumentsService', () => {
  let service: User_InstrumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User_InstrumentsService],
    }).compile();

    service = module.get<User_InstrumentsService>(User_InstrumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
