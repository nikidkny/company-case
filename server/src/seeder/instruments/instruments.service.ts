import { Injectable } from '@nestjs/common';
import { Instrument } from './instrument.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectModel(Instrument.name) private instrumentModel: Model<Instrument>,
  ) {}

  async seedInstruments(): Promise<void> {
    const instruments = [
      { name: 'Piano' },
      { name: 'Guitar' },
      { name: 'Violin' },
      { name: 'Drums' },
      { name: 'Flute' },
      { name: 'Saxophone' },
      { name: 'Trumpet' },
      { name: 'Cello' },
      { name: 'Clarinet' },
      { name: 'Harp' },
      { name: 'Trombone' },
      { name: 'Accordion' },
      { name: 'Bass Guitar' },
      { name: 'Ukulele' },
      { name: 'Synthesizer' },
    ];

    await this.instrumentModel.insertMany(instruments);
  }
}
