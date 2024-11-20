import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/user.entity";
import { AuthController } from "./auth.controller";
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from "./auth.service";
import { JwtModule, } from "@nestjs/jwt";
import * as request from 'supertest';
import { ConfigService } from "@nestjs/config";
import { JwtAuthStrategy } from "./jwt.strategy";

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let userModel: Model<User>;
  let validToken: string;

  beforeAll(async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),  // Mocking the return value for JWT_SECRET
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/test'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
          secret: 'test-secret',  // Ensure this secret matches the one in JwtStrategy
          signOptions: { expiresIn: '10s' }, // Short-lived access token for testing
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        JwtAuthStrategy,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get(AuthService);
    userModel = moduleFixture.get(getModelToken(User.name));
  });

  it('should create a new user (signup)', async () => {
    // Define a sample user DTO with unique data for the test
    const createUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      birthDate: new Date(),
      isAvailable: true,
    };

    // Make a POST request to the /auth/signup route with the sample data
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);

    const userInDb = await userModel.findOne({ email: createUserDto.email });
    expect(userInDb).not.toBeNull();
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login an existing user and return a JWT token', async () => {
    // Check if the user exists in the database
    //POST request. IMPORTANT: Keep same credentials as the test for signup
    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "john.doe@example.com",
        password: "password123"
      })
      .expect(HttpStatus.OK);

    // Verify the response contains accessToken and refreshToken cookies
    const cookies = loginResponse.headers['set-cookie'] as unknown as string[];
    expect(cookies).toBeDefined();
    expect(cookies.some(cookie => cookie.startsWith('accessToken='))).toBeTruthy();
    expect(cookies.some(cookie => cookie.startsWith('refreshToken='))).toBeTruthy();

    // Optionally, decode the JWT to verify its content (optional)
    const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
    const accessToken = accessTokenCookie?.split(';')[0].split('=')[1];

    // Save the accessToken for later use in protected route test
    validToken = accessToken;

    // Decode the JWT to verify its payload (you can use a library like `jsonwebtoken`)
    const jwt = require('jsonwebtoken');
    const decodedToken = jwt.decode(accessToken);

    expect(decodedToken).toHaveProperty('sub'); // The user ID should be in the token
    expect(decodedToken).toHaveProperty('email', 'john.doe@example.com'); // Ensure email matches
  });

  it('should return 401 if no cookies are present', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/protected')
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should reject access to protected route with an invalid token (401)', async () => {
    // Create a fake invalid token (for instance, a token with random data)
    const invalidToken = 'invalid.jwt.token';

    // Make a POST request to the protected route with the invalid token in the cookies
    const response = await request(app.getHttpServer())
      .post('/auth/protected')
      .set('Cookie', `accessToken=${invalidToken}`)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body.message).toBe('Unauthorized');
  });

  /* TODO:
  it('should allow access to protected route with a valid token (200)', async () => {
 
 });
  
  */

  afterAll(async () => {
    try {
      await userModel.deleteMany({});
    } catch (error) {
      console.error('Error during cleanup:', error);
    } finally {
      await app.close();
    }
  });
});