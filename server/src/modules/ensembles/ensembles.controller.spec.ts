import { Test, TestingModule } from '@nestjs/testing';
import { EnsemblesController } from './ensembles.controller';
import { EnsemblesService } from './ensembles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Ensemble } from './Ensemble.entity';

describe('EnsemblesController', () => {
  let controller: EnsemblesController;
  let service: EnsemblesService;

  beforeEach(async () => {
    const mockEnsembleModel = jest.fn(); // Mock the EnsembleModel

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnsemblesController],
      providers: [
        EnsemblesService,
        {
          provide: getModelToken(Ensemble.name), // Provide the mock EnsembleModel
          useValue: mockEnsembleModel,
        },
      ],
    }).compile();

    controller = module.get<EnsemblesController>(EnsemblesController);
    service = module.get<EnsemblesService>(EnsemblesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Additional tests for controller methods can go here
});
