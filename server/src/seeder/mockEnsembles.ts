import { Types } from 'mongoose';
import mockUsers from './mockUsers'; // Assuming this imports the mockUsers you provided.

const mockEnsembles = [
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a10'),
    name: 'The Rocking Stars',
    memberList: [
      new Types.ObjectId(mockUsers[0]._id), // Linked to user at index 0 (John Doe)
      new Types.ObjectId(mockUsers[3]._id), // Linked to user at index 3 (Emma F.)
    ],
    createdBy: new Types.ObjectId(mockUsers[0]._id), // Linked to John Doe (userId)
    description: 'A rock band looking for more members to join.',
    numberOfMembers: 4,
    location: 'Odense, Denmark', // Combined postNumber and city into a single string
    sessionFrequency: 'Weekly',
    genre: ['Rock', 'Alternative'],
    isPermanent: true,
    image: 'rockingstars_imageurl',
    activeMusicians: 'John Doe, Emma F.', // Added activeMusicians field
    webpage: 'https://rockingstarsWEB.com',
    createdAt: new Date('2024-10-01T09:00:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a13'),
    name: 'Jazz Collective',
    memberList: [
      new Types.ObjectId(mockUsers[2]._id), // Linked to user at index 2 (Katherine S.)
    ],
    createdBy: new Types.ObjectId(mockUsers[2]._id), // Linked to Katherine S. (userId)
    description: 'A jazz band looking for musicians to jam with.',
    numberOfMembers: 3,
    location: 'Copenhagen, Denmark', // Combined postNumber and city into a single string
    sessionFrequency: 'Monthly',
    genre: ['Jazz', 'Blues'],
    isPermanent: false,
    image: 'jazzcollective_imageurl',
    activeMusicians: 'Katherine S.', // Added activeMusicians field
    webpage: 'https://jazzcollectiveWEB.com',
    createdAt: new Date('2024-09-15T12:00:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f8f0b2c001d3b0a1b'),
    name: 'Indie Vibes',
    memberList: [
      new Types.ObjectId(mockUsers[1]._id), // Linked to user at index 1 (Emil D.)
    ],
    createdBy: new Types.ObjectId(mockUsers[1]._id), // Linked to Emil D. (userId)
    description: 'Indie band with a relaxed vibe. We need a lead guitarist.',
    numberOfMembers: 4,
    location: 'Copenhagen, Denmark', // Combined postNumber and city into a single string
    sessionFrequency: 'Weekly',
    genre: ['Indie', 'Pop'],
    isPermanent: true,
    image: 'indievibes_imageurl',
    activeMusicians: 'Emil D.', // Added activeMusicians field
    webpage: 'https://indievibesbandWEB.com',
    createdAt: new Date('2024-08-20T14:30:00Z'),
  },
  {
    _id: new Types.ObjectId('651a1e9f9f1b2c001d3b0a1b'),
    name: 'Classical Strings',
    memberList: [
      new Types.ObjectId(mockUsers[3]._id), // Linked to user at index 3 (Emma F.)
    ],
    createdBy: new Types.ObjectId(mockUsers[3]._id), // Linked to Emma F. (userId)
    description: 'Classical music group. Looking for violinists.',
    numberOfMembers: 5,
    location: 'Aarhus, Denmark', // Combined postNumber and city into a single string
    sessionFrequency: 'Bi-Weekly',
    genre: ['Classical'],
    isPermanent: true,
    image: 'classicalstrings_imageurl',
    activeMusicians: 'Emma F.', // Added activeMusicians field
    webpage: 'https://classicalstringsWEB.com',
    createdAt: new Date('2024-07-10T11:00:00Z'),
  },
  {
    _id: new Types.ObjectId('451a1e9f8f1b2c001d3b0a1b'),
    name: 'Electronic Pulse',
    memberList: [
      new Types.ObjectId(mockUsers[4]._id), // Linked to user at index 4 (Anders T.)
    ],
    createdBy: new Types.ObjectId(mockUsers[4]._id), // Linked to Anders T. (userId)
    description: 'Electronic music duo. Looking for a vocalist.',
    numberOfMembers: 2,
    location: 'Copenhagen, Denmark', // Combined postNumber and city into a single string
    sessionFrequency: 'Monthly',
    genre: ['Electronic', 'Synthwave'],
    isPermanent: false,
    image: 'electronicpulse_imageurl',
    activeMusicians: 'Anders T.', // Added activeMusicians field
    webpage: 'https://electronicpulseWEB.com',
    createdAt: new Date('2024-06-18T13:00:00Z'),
  },
];

export default mockEnsembles;
