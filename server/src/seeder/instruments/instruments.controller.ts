import { Controller } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';

// import { UpdateInstrumentDto } from './dto/update-instrument.dto';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  async seedInstruments() {
    return await this.instrumentsService.seedInstruments();
  }
}
