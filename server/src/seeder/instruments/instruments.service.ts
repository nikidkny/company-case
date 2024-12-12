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

    // Fetch existing instruments to check which are already in the database
    const existingInstruments = await this.instrumentModel
      .find({ name: { $in: instruments.map((inst) => inst.name) } })
      .exec();

    const existingNames = existingInstruments.map((inst) => inst.name);

    // Filter out instruments that already exist
    const newInstruments = instruments.filter(
      (instrument) => !existingNames.includes(instrument.name),
    );

    // Insert only the new instruments
    if (newInstruments.length > 0) {
      await this.instrumentModel.insertMany(newInstruments);
    }
  }

  // Method to retrieve all instruments
  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentModel.find().exec();
  }
}
