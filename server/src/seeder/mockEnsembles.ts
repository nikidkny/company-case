import mockUsers from './mockUsers'; // Assuming this imports the mockUsers you provided.

const mockEnsembles = [
  {
    _id: '651a1e9f8f1b2c001d3b0a10',
    name: 'The Rocking Stars',
    memberList: [
      mockUsers[0]._id, // John Doe
      mockUsers[3]._id, // Emma F.
    ],
    createdBy: mockUsers[0]._id, // John Doe
    description: 'A rock band looking for more members to join.',
    numberOfMembers: '4',
    zip: '5000',
    city: 'Odense',
    sessionFrequency: 'Weekly',
    genres: ['Rock', 'Alternative'], // Updated to match schema
    isPermanent: true,
    image: 'rockingstars_imageurl',
    activeMusicians: 'John Doe, Emma F.',
    webpage: 'https://rockingstarsWEB.com',
    createdAt: new Date('2024-10-01T09:00:00Z'),
  },
  {
    _id: '651a1e9f8f1b2c001d3b0a13',
    name: 'Jazz Collective',
    memberList: [
      mockUsers[2]._id, // Katherine S.
    ],
    createdBy: mockUsers[2]._id, // Katherine S.
    description: 'A jazz band looking for musicians to jam with.',
    numberOfMembers: '3',
    zip: '1000',
    city: 'Copenhagen',
    sessionFrequency: 'Monthly',
    genres: ['Jazz', 'Blues'], // Updated to match schema
    isPermanent: false,
    image: 'jazzcollective_imageurl',
    activeMusicians: 'Katherine S.',
    webpage: 'https://jazzcollectiveWEB.com',
    createdAt: new Date('2024-09-15T12:00:00Z'),
  },
  {
    _id: '651a1e9f8f0b2c001d3b0a1b',
    name: 'Indie Vibes',
    memberList: [
      mockUsers[1]._id, // Emil D.
    ],
    createdBy: mockUsers[1]._id, // Emil D.
    description: 'Indie band with a relaxed vibe. We need a lead guitarist.',
    numberOfMembers: '4',
    zip: '1000',
    city: 'Copenhagen',
    sessionFrequency: 'Weekly',
    genres: ['Indie', 'Pop'], // Updated to match schema
    isPermanent: true,
    image: 'indievibes_imageurl',
    activeMusicians: 'Emil D.',
    webpage: 'https://indievibesbandWEB.com',
    createdAt: new Date('2024-08-20T14:30:00Z'),
  },
  {
    _id: '651a1e9f9f1b2c001d3b0a1b',
    name: 'Classical Strings',
    memberList: [
      mockUsers[3]._id, // Emma F.
    ],
    createdBy: mockUsers[3]._id, // Emma F.
    description: 'Classical music group. Looking for violinists.',
    numberOfMembers: '5',
    zip: '8000',
    city: 'Aarhus',
    sessionFrequency: 'Bi-Weekly',
    genres: ['Classical'], // Updated to match schema
    isPermanent: true,
    image: 'classicalstrings_imageurl',
    activeMusicians: 'Emma F.',
    webpage: 'https://classicalstringsWEB.com',
    createdAt: new Date('2024-07-10T11:00:00Z'),
  },
  {
    _id: '451a1e9f8f1b2c001d3b0a1b',
    name: 'Electronic Pulse',
    memberList: [
      mockUsers[4]._id, // Anders T.
    ],
    createdBy: mockUsers[4]._id, // Anders T.
    description: 'Electronic music duo. Looking for a vocalist.',
    numberOfMembers: '2',
    zip: '1000',
    city: 'Copenhagen',
    sessionFrequency: 'Monthly',
    genres: ['Electronic', 'Synthwave'], // Updated to match schema
    isPermanent: false,
    image: 'electronicpulse_imageurl',
    activeMusicians: 'Anders T.',
    webpage: 'https://electronicpulseWEB.com',
    createdAt: new Date('2024-06-18T13:00:00Z'),
  },
];

export default mockEnsembles;
