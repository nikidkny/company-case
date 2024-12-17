import { Test, TestingModule } from '@nestjs/testing';
import { Post_EnsemblesService } from './post_ensembles.service';

describe('Post_EnsemblesService', () => {
  let service: Post_EnsemblesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Post_EnsemblesService],
    }).compile();

    service = module.get<Post_EnsemblesService>(Post_EnsemblesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
