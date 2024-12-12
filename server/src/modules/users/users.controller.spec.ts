import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.entity';
import { ObjectId } from 'mongodb'; // Import ObjectId

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUserModel = jest.fn(); // Mock the UserModel

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name), // Provide the mock UserModel
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // write a test for update the user
  it('should update a user', async () => {
    // Arrange
    const updateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: '',
    };
    const userId = new ObjectId(); // Use ObjectId for userId
    const updatedUser = {
      ...updateUserDto,
      _id: userId,
      password: 'mocked_password',
      description: 'mocked_description',
      birthdate: new Date(),
      city: 'mocked_city',
      zip: 'mocked_zip',
      phoneNumber: 'mocked_phoneNumber',
      image: 'mocked_image',
      lastLoggedIn: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAvailable: true,
      isNewsletter: false,
      isDeleted: false,
      // Add other required properties here
    };
    jest.spyOn(service, 'update').mockResolvedValue(updatedUser);
    // Act
    const result = await controller.update(userId.toHexString(), updateUserDto); // Convert ObjectId to string
    // Assert
    expect(result).toEqual(updatedUser);
  });
  // Additional tests for controller methods can go here
});
