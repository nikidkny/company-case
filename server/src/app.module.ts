import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { EnsemblesModule } from './modules/ensembles/ensembles.module';

const daosUri = 'mongodb://127.0.0.1:27017/DAOS';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    EnsemblesModule,
    MongooseModule.forRoot(daosUri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
