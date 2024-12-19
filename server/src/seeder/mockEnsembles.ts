import { Types } from 'mongoose';
import mockUsers from './mockUsers'; // Assuming this imports the mockUsers you provided.

const mockEnsembles = [
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a10'),
    name: 'The Rocking Stars',
    memberList: [
      mockUsers[0]._id.toString(), // John Doe
      mockUsers[3]._id.toString(), // Oliver Hollm
    ],
    createdBy: mockUsers[0]._id.toString(), // John Doe
    description: 'A rock band looking for more members to join.',
    numberOfMembers: '4',
    zip: '5000',
    city: 'Odense',
    sessionFrequency: 'Weekly',
    genres: ['Rock', 'Alternative'], // Updated to match schema
    isPermanent: true,
    image: 'rockingstars_imageurl',
    activeMusicians: '1 - 4 musicians',
    webpage: 'https://rockingstarsWEB.com',
    createdAt: new Date('2024-10-01T09:00:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a13'),
    name: 'Jazz Collective',
    memberList: [
      mockUsers[0]._id.toString(), // John Doe
      mockUsers[2]._id.toString(), // Katherine S.
      mockUsers[5]._id.toString(), // William B.
      mockUsers[6]._id.toString(), // Isabella L.
      mockUsers[7]._id.toString(), // Jesper L.
    ],
    createdBy: mockUsers[2]._id.toString(), // Katherine S.
    description: 'A jazz band looking for musicians to jam with.',
    numberOfMembers: '3',
    zip: '1000',
    city: 'Copenhagen',
    sessionFrequency: 'Monthly',
    genres: ['Jazz', 'Blues'], // Updated to match schema
    isPermanent: false,
    image: 'jazzcollective_imageurl',
    activeMusicians: '5 - 9 musicians',
    webpage: 'https://jazzcollectiveWEB.com',
    createdAt: new Date('2024-09-15T12:00:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f8f0b2c001d3b0a1b'),
    name: 'Indie Vibes',
    memberList: [
      mockUsers[1]._id.toString(), // Emil D.
    ],
    createdBy: mockUsers[1]._id.toString(), // Emil D.
    description: 'Indie band with a relaxed vibe. We need a lead guitarist.',
    numberOfMembers: '4',
    zip: '1000',
    city: 'Copenhagen',
    sessionFrequency: 'Weekly',
    genres: ['Indie', 'Pop'], // Updated to match schema
    isPermanent: true,
    image: 'indievibes_imageurl',
    activeMusicians: 'More than 50 musicians',
    webpage: 'https://indievibesbandWEB.com',
    createdAt: new Date('2024-08-20T14:30:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f9f1b2c001d3b0a1b'),
    name: 'Classical Strings',
    memberList: [
      mockUsers[3]._id.toString(), // Oliver Hollm
    ],
    createdBy: mockUsers[3]._id.toString(), // Oliver Hollm
    description: 'Classical music group. Looking for violinists.',
    numberOfMembers: '5',
    zip: '8000',
    city: 'Aarhus',
    sessionFrequency: 'Bi-Weekly',
    genres: ['Classical'], // Updated to match schema
    isPermanent: true,
    image: 'classicalstrings_imageurl',
    activeMusicians: '1 - 4 musicians',
    webpage: 'https://classicalstringsWEB.com',
    createdAt: new Date('2024-07-10T11:00:00Z'),
  },
  {
    _id: new Types.ObjectId('451a1e9f8f1b2c001d3b0a1b'),
    name: 'Electronic Pulse',
    memberList: [
      mockUsers[4]._id.toString(), // Sofia Marller
    ],
    createdBy: mockUsers[4]._id.toString(), // Sofia Marller
    description: 'Electronic music duo. Looking for a vocalist.',
    numberOfMembers: '2',
    zip: '1000',
    city: 'Copenhagen',
    sessionFrequency: 'Monthly',
    genres: ['Electronic', 'Synthwave'], // Updated to match schema
    isPermanent: false,
    image: 'electronicpulse_imageurl',
    activeMusicians: '1 - 4 musicians',
    webpage: 'https://electronicpulseWEB.com',
    createdAt: new Date('2024-06-18T13:00:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a1c'),
    name: 'Chicago Jazz Collective',
    memberList: [
      mockUsers[5]._id.toString(), // Katherine S.
    ],
    createdBy: mockUsers[5]._id.toString(), // Katherine S.
    description: 'Jazz band in Chicago. Seeking a drummer.',
    numberOfMembers: '4',
    zip: '60601',
    city: 'Chicago',
    sessionFrequency: 'Weekly',
    genres: ['Jazz', 'Blues'], // Updated to match schema
    isPermanent: true,
    image: 'imageurl',
    activeMusicians: '1 - 4 musicians',
    webpage: 'https://chiJazzCollectiveWEB.com',
    createdAt: new Date('2024-05-25T15:00:00Z'),
  },
];

export default mockEnsembles;
