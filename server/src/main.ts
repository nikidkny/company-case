import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(),
    //validation goes here if we want to include field with the error and a message
    //if the guard is needed for the entire application, it should be specified here
  );

  const seederService = app.get(SeederService);
  // Call the seeding function
  await seederService.seedDatabase();

  console.log('Seeding complete');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
