import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { EnsemblesModule } from './modules/ensembles/ensembles.module';
import { SeederModule } from './seeder/seeder.module';
import { InstrumentsModule } from './seeder/instruments/instruments.module';
import { User_InstrumentsModule } from './modules/user_Instruments/user_Instruments.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User_EnsembleModule } from './modules/user_ensembles/user-ensemble.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    EnsemblesModule,
    SeederModule,
    InstrumentsModule,
    User_InstrumentsModule,
    AuthModule,
    User_EnsembleModule,
    MongooseModule.forRootAsync(
      {
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGODB_URI'),
        }),
        inject: [ConfigService],
      }
    ),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
