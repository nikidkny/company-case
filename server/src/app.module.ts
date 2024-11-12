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

const daosUri = 'mongodb://127.0.0.1:27017/DAOS';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    EnsemblesModule,
    SeederModule,
    InstrumentsModule,
    User_InstrumentsModule,
    MongooseModule.forRoot(daosUri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
