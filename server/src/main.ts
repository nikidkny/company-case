import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeederService } from './seeder/seeder.service';
import { InstrumentsService } from './modules/instruments/instruments.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies if needed
  });

  app.useGlobalPipes(
    new ValidationPipe(),
    //validation goes here if we want to include field with the error and a message
    //if the guard is needed for the entire application, it should be specified here
  );
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies if needed
  });

  const seederService = app.get(SeederService);
  const seederInstruments = app.get(InstrumentsService);
  // Call the seeding function
  await seederInstruments.seedInstruments();
  await seederService.seedDatabase();

  console.log('Seeding complete');

  await app.listen(process.env.PORT);
  console.log('Server running on port', process.env.PORT);
}
bootstrap();
