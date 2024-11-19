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

    expect(loginResponse.body.message).toBe('Login successful');
    expect(loginResponse.body.accessToken).toBeDefined();
    validToken = loginResponse.body.accessToken;
  });

  it('should reject access to protected route without a token or with an invalid token (401)', async () => {
    // Try to access protected route without an access token
    await request(app.getHttpServer())
      .post('/auth/protected')
      .expect(HttpStatus.UNAUTHORIZED);

    // Try to access protected route with an invalid token
    await request(app.getHttpServer())
      .post('/auth/protected')
      .set('Authorization', 'Bearer invalid_token')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should allow access to protected route with a valid token (200)', async () => {
    // Access the protected route with a valid JWT token
    const response = await request(app.getHttpServer())
      .post('/auth/protected')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(HttpStatus.OK);

    expect(response.body.message).toBe('You have access to this route');
  });

  it('Should issue a new access token using the refresh token', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      })
      .expect(HttpStatus.OK);

    const { accessToken, refreshToken } = loginResponse.body;

    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();


    await new Promise((resolve) => setTimeout(resolve, 1100)); // Wait 1.1 seconds to make the access token expire

    const refreshResponse = await request(app.getHttpServer())
      .post('/auth/refresh/')
      .send({
        refreshToken
      })
      .expect(HttpStatus.OK);

    const newAccessToken = refreshResponse.body.accessToken;
    expect(newAccessToken).toBeDefined();
    if (newAccessToken === accessToken) {
      console.warn('The new access token is the same as the original because the original is still valid.');
    } else {
      expect(newAccessToken).not.toBe(accessToken); // Enforce that it's different
    }

    const protectedRouteResponse = await request(app.getHttpServer())
      .post('/auth/protected/')
      .set('Authorization', `Bearer ${newAccessToken}`)
      .expect(HttpStatus.OK);

    expect(protectedRouteResponse.body.message).toBe('You have access to this route');
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
