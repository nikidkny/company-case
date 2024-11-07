import { Types } from 'mongoose';
import mockUsers from './mockUsers';
import mockEnsembles from './mockEnsembles';

const mockPosts = [
  {
    _id: new Types.ObjectId('652a1f9f8f1b2c001d3b0b12'),
    title: 'Looking for a Guitarist for Rock Band',
    location: 'New York, NY',
    description:
      'We are a rock band looking for a talented guitarist to join our team. Must be passionate and reliable.',
    type: 'MusicianWanted',
    createdBy: new Types.ObjectId(mockEnsembles[1]._id), // Linked to 'The Rocking Stars' ensemble
    isReported: false,
    instrument: 'Guitar',
    experienceRequired: 'At least 3 years of experience playing rock music.',
    webPage: 'https://therockersbandWEB.com',
    createdAt: new Date('2024-10-01T10:00:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-10-01T10:00:00Z'),
  },
  {
    _id: new Types.ObjectId('651a9e9f8f1b2c001d3b0a12'),
    title: 'Piano Player Needed for Wedding Event',
    location: 'Los Angeles, CA',
    description:
      'Looking for a skilled pianist to perform at a wedding event. The ideal candidate should be able to play classical and contemporary songs.',
    type: 'MusicianWanted',
    createdBy: new Types.ObjectId(mockUsers[4]._id), // Linked to Emil D. (userId)
    isReported: false,
    instrument: 'Piano',
    experienceRequired: 'At least 2 years of performance experience.',
    webPage: 'https://weddingeventscoWEB.com',
    createdAt: new Date('2024-10-05T14:30:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-10-05T14:30:00Z'),
  },
  {
    _id: new Types.ObjectId('6a1a1e9f8f1b2c001d3b0a12'),
    title: 'Looking for Drummer for Jazz Band',
    location: 'Chicago, IL',
    description:
      'We are a jazz band looking for a versatile drummer. Experience in jazz is a plus.',
    type: 'MusicianWanted',
    createdBy: new Types.ObjectId(mockEnsembles[0]._id), // Linked to 'Chicago Jazz Collective' ensemble
    isReported: false,
    instrument: 'Drums',
    experienceRequired: 'Experience in jazz music preferred.',
    webPage: 'https://chicagojazzcollectiveWEB.com',
    createdAt: new Date('2024-09-20T12:15:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-09-20T12:15:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001b3b0a13'),
    title: 'Seeking Bass Player for Indie Band',
    location: 'Austin, TX',
    description:
      'We are an indie band looking for a bassist. You should be passionate and ready to collaborate.',
    type: 'MusicianWanted',
    createdBy: new Types.ObjectId(mockEnsembles[3]._id), // Linked to 'Indie Vibes' ensemble
    isReported: false,
    instrument: 'Bass',
    experienceRequired: 'No minimum experience required, just passion.',
    webPage: 'https://indiebeatsbandWEB.com',
    createdAt: new Date('2024-09-10T08:00:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-09-10T08:00:00Z'),
  },
  {
    _id: new Types.ObjectId('051a1e9f8f1b2c001d3b0a13'),
    title: 'Experienced Violinist Available for Performances',
    location: 'San Francisco, CA',
    description:
      'I am an experienced violinist available for solo or group performances. Classical and contemporary music.',
    type: 'MusicianAvailable',
    createdBy: new Types.ObjectId(mockUsers[0]._id), // Linked to John Doe (userId)
    isReported: false,
    instrument: 'Violin',
    experienceRequired:
      '5+ years of experience in classical and contemporary music.',
    webPage: 'https://janedoeviolinistWEB.com',
    createdAt: new Date('2024-08-15T10:00:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-08-15T10:00:00Z'),
  },
  {
    _id: new Types.ObjectId('691a1e9f8f1b2c001d3b0a13'),
    title: 'Looking for Vocalist for Pop Music Project',
    location: 'Nashville, TN',
    description:
      'Pop music project looking for a talented vocalist. Must be comfortable with both live performances and studio recordings.',
    type: 'MusicianWanted',
    createdBy: new Types.ObjectId(mockEnsembles[4]._id), // Linked to 'Pop Music Collective' ensemble
    isReported: false,
    instrument: 'Vocals',
    experienceRequired:
      '2+ years of singing experience, ability to harmonize a plus.',
    webPage: 'https://popmusiccollectiveWEB.com',
    createdAt: new Date('2024-07-30T16:30:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-07-30T16:30:00Z'),
  },
  {
    _id: new Types.ObjectId('431a1e9f8f1b2c001d3b0a1b'),
    title: 'Available Pianist for Corporate Events',
    location: 'Miami, FL',
    description:
      'Experienced pianist available for corporate events, weddings, and private parties. Classical and jazz repertoire available.',
    type: 'MusicianAvailable',
    createdBy: new Types.ObjectId(mockUsers[1]._id), // Linked to Emil D. (userId)
    isReported: false,
    instrument: 'Piano',
    experienceRequired: '3+ years of performance experience.',
    webPage: 'https://carlosriverapianoWEB.com',
    createdAt: new Date('2024-06-25T11:00:00Z'),
    deletedAt: null,
    updatedAt: new Date('2024-06-25T11:00:00Z'),
  },
];

export default mockPosts;
