import { Controller, Get } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  // Existing seeding method
  @Get('seed') // Add a specific route for seeding
  async seedInstruments() {
    return await this.instrumentsService.seedInstruments();
  }

  // Add GET route to retrieve instruments
  @Get() // This will handle GET requests to /instruments
  async getInstruments() {
    return await this.instrumentsService.getAllInstruments();
  }
}
