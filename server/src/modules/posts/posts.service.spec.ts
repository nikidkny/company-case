import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let postModel: Model<PostDocument>;

  beforeEach(async () => {
    const mockPostModel = jest
      .fn()
      .mockImplementation((createPostDto: CreatePostDto) => ({
        ...createPostDto,
        _id: 'mocked_id',
        save: jest
          .fn()
          .mockResolvedValue({ ...createPostDto, _id: 'mocked_id' }),
      }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postModel = module.get<Model<PostDocument>>(getModelToken(Post.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //more tests for the Posts service should be added here like fx get, get all etc

  it('should create a post', async () => {
    // Arrange
    const createPostDto: CreatePostDto = {
      title: 'Post Title',
      description: 'Post description',
      location: 'Copenhagen',
      createdBy: 'John',
      instrument: 'Violin',
      webpage: 'Webpage link',
      experienceRequired: 5,
      genres: ['Rock'],
    };

    // Act
    const newPost = await service.create(createPostDto);

    // Assert
    expect(postModel).toHaveBeenCalledWith(createPostDto); // Check that PostModel constructor was called
    expect(newPost).toEqual({ ...createPostDto, _id: 'mocked_id' }); // Check that the created Post has the expected structure
  });
});
