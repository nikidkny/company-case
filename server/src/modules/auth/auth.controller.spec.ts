import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.entity';
import { AuthController } from './auth.controller';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';
import { JwtAuthStrategy } from './jwt.strategy';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

// TODO: fix tests.
describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let userModel: Model<User>;
  let validToken: string;

  const mockUserFirstName = "John";
  const mockUserLastName = "Doe";
  const mockUserEmail = "john.doe@example.com";
  const mockUserPassword = "password123";

  beforeAll(async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('test-secret'), // Mocking the return value for JWT_SECRET
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/test'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
          secret: 'test-secret', // Ensure this secret matches the one in JwtStrategy
          signOptions: { expiresIn: '1s' }, // Short-lived access token for testing
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

  // *Signup*
  it('should create a new user (signup)', async () => {
    // Define a sample user DTO with unique data for the test
    const createUserDto = {
      firstName: mockUserFirstName,
      lastName: mockUserLastName,
      email: mockUserEmail,
      password: mockUserPassword,
      confirmPassword: mockUserPassword,
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

  // *Login existing user*
  it('should login an existing user and return a JWT token', async () => {
    // Check if the user exists in the database
    //POST request. IMPORTANT: Keep same credentials as the test for signup
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: mockUserEmail,
        password: mockUserPassword,
      })
      .expect(HttpStatus.OK);

    // Verify the response contains accessToken and refreshToken cookies
    const cookies = loginResponse.headers['set-cookie'] as unknown as string[];
    expect(cookies).toBeDefined();
    expect(
      cookies.some((cookie) => cookie.startsWith('accessToken=')),
    ).toBeTruthy();
    expect(
      cookies.some((cookie) => cookie.startsWith('refreshToken=')),
    ).toBeTruthy();

    // Optionally, decode the JWT to verify its content (optional)
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('accessToken='),
    );
    const accessToken = accessTokenCookie?.split(';')[0].split('=')[1];

    // Save the accessToken for later use in protected route test
    validToken = accessToken;

    // Decode the JWT to verify its payload (you can use a library like `jsonwebtoken`)
    const jwt = require('jsonwebtoken');
    const decodedToken = jwt.decode(accessToken);

    expect(decodedToken).toHaveProperty('id'); // The user ID should be in the token
    expect(decodedToken).toHaveProperty('email', mockUserEmail); // Ensure email matches
  });

  // *Login not existing user expecting not found*
  it('should login an non existing user and get a not found exception', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'jn.de@example.com',
        password: 'password',
      })
      .expect(HttpStatus.NOT_FOUND);
  })

  // *Accessing protected route with not logged in user*
  it('should return 401 if cookies are not present', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/logout')
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body.message).toBe('Unauthorized');
  });

  // *Login existing user with wrong credentials expecting 400*
  it('should return 400 if login with wrong credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'wrongPassword'
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  // *Refresh Token using valid refresh token*
  it('should refresh the access token successfully', async () => {

    // First, log in to get a valid refresh token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: mockUserEmail,
        password: mockUserPassword,
      })
      .expect(HttpStatus.OK);

    // Extract the refresh token from the response cookies
    const cookies = loginResponse.headers['set-cookie'] as unknown as string[];

    // Ensure cookies are defined and find the refresh token
    expect(cookies).toBeDefined();
    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );

    const refreshToken = refreshTokenCookie?.split(';')[0].split('=')[1];

    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', [`refreshToken=${refreshToken}`])
      .expect(HttpStatus.CREATED);

    // Make a request to refresh the access token
    // Verify the response contains a new access token cookie
    const refreshCookies = refreshResponse.headers['set-cookie'] as unknown as string[];
    expect(refreshCookies).toBeDefined();
    expect(
      refreshCookies.some((cookie) => cookie.startsWith('accessToken=')),
    ).toBeTruthy();

    // Optionally, decode the new access token to verify its payload
    const accessTokenCookie = refreshCookies.find((cookie) =>
      cookie.startsWith('accessToken='),
    );
    const newAccessToken = accessTokenCookie?.split(';')[0].split('=')[1];

    const jwt = require('jsonwebtoken');
    const decodedToken = jwt.decode(newAccessToken);

    expect(decodedToken).toHaveProperty('id'); // Ensure the token contains the user ID
    expect(decodedToken).toHaveProperty('email', mockUserEmail); // Ensure email matches
  });

  // *Refresh Token using invalid refresh token*
  it('should return UNAUTHORIZED for an invalid refresh token', async () => {
    const invalidRefreshToken = 'someInvalidToken123';

    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', [`refreshToken=${invalidRefreshToken}`])
      .expect(HttpStatus.UNAUTHORIZED);

    expect(refreshResponse.body.message).toBe('Invalid or expired refresh token');
  });

  it('should return UNAUTHORIZED for an expired refresh token', async () => {
    // Log in to get a valid refresh token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: mockUserEmail,
        password: mockUserPassword,
      })
      .expect(HttpStatus.OK);

    const cookies = loginResponse.headers['set-cookie'] as unknown as string[];
    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );

    expect(refreshTokenCookie).toBeDefined();

    const validRefreshToken = refreshTokenCookie?.split(';')[0].split('=')[1];
    const decodedRefreshToken = jwt.decode(validRefreshToken) as any;

    // Manually expire the refresh token
    const expiredRefreshToken = jwt.sign(
      { id: decodedRefreshToken.id, email: decodedRefreshToken.email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '-10s' }, // Expired 10 seconds ago
    );

    // Use the expired token in the refresh request
    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', [`refreshToken=${expiredRefreshToken}`])
      .expect(HttpStatus.UNAUTHORIZED);

    expect(refreshResponse.body.message).toBe('Invalid or expired refresh token');
  });


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
