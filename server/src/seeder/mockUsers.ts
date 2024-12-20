import { Types } from 'mongoose';

const mockUsers = [
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a1b'),
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    password: 'hashedPassword',
    description: '',
    birthdate: new Date(),
    isAvailable: true,
    city: 'Odense',
    zip: '5000',
    phoneNumber: '5739603',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: false,
    isDeleted: false,
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a1c'),
    firstName: 'Emil',
    lastName: 'D.',
    email: 'emil@example.com',
    password: 'hashedPassword',
    description: 'Just started playing',
    birthdate: new Date(),
    isAvailable: false,
    city: 'Copenhagen',
    zip: '2100',
    phoneNumber: '5739305',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: true,
    isDeleted: false,
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a12'),
    firstName: 'Katherine',
    lastName: 'S.',
    email: 'katherine@example.com',
    password: 'hashedPassword',
    description: 'Have started playing a while ago',
    birthdate: new Date(),
    isAvailable: true,
    city: 'Copenhagen',
    zip: '2100',
    phoneNumber: '3958200',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: false,
    isDeleted: false,
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a13'),
    firstName: 'Oliver',
    lastName: 'Hollm',
    email: 'oliver@example.com',
    password: 'hashedPassword',
    description: 'I am a professional musician',
    birthdate: new Date(),
    isAvailable: true,
    city: 'Aarhus',
    zip: '8000',
    phoneNumber: '3958200',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: false,
    isDeleted: false,
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a10'),
    firstName: 'Sofia',
    lastName: 'Marller',
    email: 'soia@example.com',
    password: 'hashedPassword',
    description: 'I am a musician',
    birthdate: new Date(),
    isAvailable: true,
    city: 'Aarhus',
    zip: '8000',
    phoneNumber: '94830256',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: true,
    isDeleted: false,
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a17'),
    firstName: 'William',
    lastName: 'B.',
    email: 'william@example.com',
    password: 'hashedPassword',
    description: 'I am a begginner',
    birthdate: new Date(),
    isAvailable: false,
    city: 'Copenhagen',
    zip: '2100',
    phoneNumber: '48302859',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: false,
    isDeleted: false,
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a18'),
    firstName: 'Isabella',
    lastName: 'L.',
    email: 'isabella@example.com',
    password: 'hashedPassword',
    description: 'I am a professional musician',
    birthdate: new Date(),
    isAvailable: true,
    city: 'Copenhagen',
    zip: '2100',
    phoneNumber: '48302859',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: false,
    isDeleted: false,
  },
  {
    _id: new Types.ObjectId('651a1e9f8f1b2c001d3b0a19'),
    firstName: 'Jesper',
    lastName: 'L.',
    email: 'jesper@example.com',
    password: 'hashedPassword',
    description: 'I am a professional musician',
    birthdate: new Date(),
    isAvailable: true,
    city: 'Copenhagen',
    zip: '2100',
    phoneNumber: '48302859',
    image: 'imageurl',
    lastLoggedIn: new Date(),
    createdAt: new Date(),
    isNewsletter: false,
    isDeleted: false,
  },
];

export default mockUsers;
