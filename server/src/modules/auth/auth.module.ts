import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './jwt.strategy';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
    PassportModule,
    JwtModule.register({
      secret: `should-be-inside-inside-.env`, //TODO:
      signOptions: {expiresIn:`1h`}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
})
export class AuthModule {}
