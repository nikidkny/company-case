import { Test, TestingModule } from '@nestjs/testing';
import { Ensemble_PostsService } from './ensemble_posts.service';

describe('Ensemble_PostsService', () => {
  let service: Ensemble_PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ensemble_PostsService],
    }).compile();

    service = module.get<Ensemble_PostsService>(Ensemble_PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
