import { Types } from 'mongoose';
import mockUsers from './mockUsers';
import mockEnsembles from './mockEnsembles';

const mockUserEnsemble = [
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[0]._id.toString(),
    ensembleId: mockEnsembles[5]._id.toString(),
    joinedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[1]._id.toString(),
    ensembleId: mockEnsembles[4]._id.toString(),
    joinedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[2]._id.toString(),
    ensembleId: mockEnsembles[3]._id.toString(),
    joinedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[3]._id.toString(),
    ensembleId: mockEnsembles[2]._id.toString(),
    joinedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[4]._id.toString(),
    ensembleId: mockEnsembles[1]._id.toString(),
    joinedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[5]._id.toString(),
    ensembleId: mockEnsembles[0]._id.toString(),
    joinedAt: new Date(),
  },
];

export default mockUserEnsemble;
