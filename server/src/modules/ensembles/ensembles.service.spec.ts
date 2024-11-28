import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EnsemblesService } from './ensembles.service';
import { Model } from 'mongoose';
import { Ensemble, EnsembleDocument } from './ensemble.entity';
import { CreateEnsembleDto } from './dto/create-ensemble.dto';

describe('EnsemblesService', () => {
  let service: EnsemblesService;
  let ensembleModel: Model<EnsembleDocument>;

  beforeEach(async () => {
    const mockEnsembleModel = jest
      .fn()
      .mockImplementation((createEnsembleDto: CreateEnsembleDto) => ({
        ...createEnsembleDto,
        _id: 'mocked_id',
        save: jest
          .fn()
          .mockResolvedValue({ ...createEnsembleDto, _id: 'mocked_id' }),
      }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnsemblesService,
        {
          provide: getModelToken(Ensemble.name),
          useValue: mockEnsembleModel,
        },
      ],
    }).compile();

    service = module.get<EnsemblesService>(EnsemblesService);
    ensembleModel = module.get<Model<EnsembleDocument>>(
      getModelToken(Ensemble.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //more tests for the Ensembles service should be added here like fx get, get all etc

  it('should create a Ensemble', async () => {
    // Arrange
    const createEnsembleDto: CreateEnsembleDto = {
      name: 'Ensemble name',
      description: 'Ensemble description',
      city: 'Copenhagen',
      zip: '2200',
      sessionFrequency: 'Once a week',
      isPermanent: true,
      webpage: 'Webpage link',
      activeMusicians: '1-4',
      genres: ['Classical', 'Symphonic'],
      image: 'Image url',
    };

    // Act
    const newEnsemble = await service.create(createEnsembleDto);

    // Assert
    expect(ensembleModel).toHaveBeenCalledWith(createEnsembleDto); // Check that EnsembleModel constructor was called
    expect(newEnsemble).toEqual({ ...createEnsembleDto, _id: 'mocked_id' }); // Check that the created Ensemble has the expected structure
  });
});
