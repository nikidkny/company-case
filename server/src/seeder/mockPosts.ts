import { Types } from 'mongoose';
import mockEnsembles from './mockEnsembles';

const mockPosts = [
  {
    _id: new Types.ObjectId('652a1f9f8f1b2c001d3b0b12'),
    title: 'Looking for a Guitarist for Rock Band',
    location: 'New York, NY',
    description:
      'We are a rock band looking for a talented guitarist to join our team. Must be passionate and reliable.',
    type: 'MusicianWanted',
    createdBy: mockEnsembles[1]._id.toString(), // Linked to 'The Rocking Stars' ensemble
    isReported: false,
    instrument: 'Guitar',
    experienceRequired: 3,
    webPage: 'https://therockersbandWEB.com',
    createdAt: new Date('2024-10-01T10:00:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-10-01T10:00:00Z'),
    activeMusicians: '1 - 4 musicians',
    genres: ['Rock', 'Metal'],
  },
  {
    _id: new Types.ObjectId('6a1a1e9f8f1b2c001d3b0a12'),
    title: 'Looking for Drummer for Jazz Band',
    location: 'Chicago, IL',
    description:
      'We are a jazz band looking for a versatile drummer. Experience in jazz is a plus.',
    type: 'MusicianWanted',
    createdBy: mockEnsembles[0]._id.toString(), // Linked to 'Chicago Jazz Collective' ensemble
    isReported: false,
    instrument: 'Drums',
    experienceRequired: 1,
    webPage: 'https://chicagojazzcollectiveWEB.com',
    createdAt: new Date('2024-09-20T12:15:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-09-20T12:15:00Z'),
    activeMusicians: '1 - 4 musicians',
    genres: ['Rock'],
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001b3b0a13'),
    title: 'Seeking Bass Player for Indie Band',
    location: 'Austin, TX',
    description:
      'We are an indie band looking for a bassist. You should be passionate and ready to collaborate.',
    type: 'MusicianWanted',
    createdBy: mockEnsembles[3]._id.toString(), // Linked to 'Indie Vibes' ensemble
    isReported: false,
    instrument: 'Bass',
    experienceRequired: 0,
    webPage: 'https://indiebeatsbandWEB.com',
    createdAt: new Date('2024-09-10T08:00:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-09-10T08:00:00Z'),
    activeMusicians: '1 - 4 musicians',
    genres: ['Rock'],
  },
  {
    _id: new Types.ObjectId('691a1e9f8f1b2c001d3b0a13'),
    title: 'Looking for Vocalist for Pop Music Project',
    location: 'Nashville, TN',
    description:
      'Pop music project looking for a talented vocalist. Must be comfortable with both live performances and studio recordings.',
    type: 'MusicianWanted',
    createdBy: mockEnsembles[4]._id.toString(), // Linked to 'Pop Music Collective' ensemble
    isReported: false,
    instrument: 'Vocals',
    experienceRequired: 2,
    webPage: 'https://popmusiccollectiveWEB.com',
    createdAt: new Date('2024-07-30T16:30:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-07-30T16:30:00Z'),
    activeMusicians: '1 - 4 musicians',
    genres: ['Pop'],
  },
  {
    _id: new Types.ObjectId('6a1a1e9f8f1b2c001d3b0a13'),
    title: 'Seeking Keyboardist for Soul Band',
    location: 'Los Angeles, CA',
    description:
      'Soul band looking for a keyboardist. Must be able to play a variety of styles and be comfortable with improvisation.',
    type: 'MusicianWanted',
    createdBy: mockEnsembles[2]._id.toString(), // Linked to 'Soulful Sounds' ensemble
    isReported: false,
    instrument: 'Keyboard',
    experienceRequired: 3,
    webPage: 'https://soulfulsoundsbandWEB.com',
    createdAt: new Date('2024-07-15T14:45:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-07-15T14:45:00Z'),
    activeMusicians: '1 - 4 musicians',
    genres: ['Jazz', 'Soul'],
  },
];

export default mockPosts;
