// src/seeder/seeder.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seed')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  async seedDatabase() {
    await this.seederService.seedDatabase();
    return 'Database seeded successfully!';
  }
}
