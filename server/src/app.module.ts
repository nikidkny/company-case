import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

const daosUri = 'mongodb://127.0.0.1:27017/DAOS';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(daosUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
