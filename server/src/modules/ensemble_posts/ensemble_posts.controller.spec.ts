import { Test, TestingModule } from '@nestjs/testing';
import { Ensemble_PostsController } from './ensemble_posts.controller';
import { Ensemble_PostsService } from './ensemble_posts.service';

describe('Ensemble_PostsController', () => {
  let controller: Ensemble_PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ensemble_PostsController],
      providers: [Ensemble_PostsService],
    }).compile();

    controller = module.get<Ensemble_PostsController>(Ensemble_PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
