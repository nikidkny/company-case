import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

const daosUri = 'mongodb://127.0.0.1:27017/DAOS';

@Module({
  imports: [MongooseModule.forRoot(daosUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
