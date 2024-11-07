import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './post.entity';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const mockUserModel = jest.fn(); // Mock the UserModel

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name), // Provide the mock PostModel
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Additional tests for controller methods can go here
});
