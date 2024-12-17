import { Test, TestingModule } from '@nestjs/testing';
import { Post_EnsemblesController } from './post_ensembles.controller';
import { Post_EnsemblesService } from './post_ensembles.service';

describe('Post_EnsemblesController', () => {
  let controller: Post_EnsemblesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Post_EnsemblesController],
      providers: [Post_EnsemblesService],
    }).compile();

    controller = module.get<Post_EnsemblesController>(Post_EnsemblesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
