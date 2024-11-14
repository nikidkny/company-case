import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";

import * as request from 'supertest';
import { User, UserSchema } from "../users/user.entity";
import { AuthController } from "./auth.controller";
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let authService: AuthService;
    let userModel: Model<User>;

    beforeAll(async () => {
        // Create a testing module with Mongoose configuration for the test database
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                // Connect to the test database
                MongooseModule.forRoot('mongodb://localhost/test'),
                // Define the User model based on the User schema for the test database
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
            ],
            controllers: [AuthController],  
            providers: [AuthService],       
        }).compile();

        // Initialize the Nest application from the module
        app = moduleFixture.createNestApplication();
        
        // Retrieve instances of the AuthService and User model
        authService = moduleFixture.get<AuthService>(AuthService);
        userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));

        // Start the Nest application
        await app.init();
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

        expect(response.body.message).toBe('User registered successfully');
    });

    afterAll(async () => {
        // Clean up the User collection after tests to reset the database
        await userModel.deleteMany({});
        await app.close();
    });
});
