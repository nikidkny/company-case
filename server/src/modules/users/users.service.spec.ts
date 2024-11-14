import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const mockUserModel = jest
      .fn()
      .mockImplementation((createUserDto: CreateUserDto) => ({
        ...createUserDto,
        _id: 'mocked_id',
        save: jest
          .fn()
          .mockResolvedValue({ ...createUserDto, _id: 'mocked_id' }),
      }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //more tests for the users service should be added here like fx get, get all etc

  it('should create a user', async () => {
    // Arrange
    const createUserDto: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      birthdate: new Date('1995-07-15'),
      isAvailable: true,
    };

    // Act
    const newUser = await service.create(createUserDto);

    // Assert
    expect(userModel).toHaveBeenCalledWith(createUserDto); // Check that userModel constructor was called
    expect(newUser).toEqual({ ...createUserDto, _id: 'mocked_id' }); // Check that the created user has the expected structure
  });
});
