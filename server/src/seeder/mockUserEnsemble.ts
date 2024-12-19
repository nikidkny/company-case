import { Types } from 'mongoose';
import mockUsers from './mockUsers';
import mockEnsembles from './mockEnsembles';

const mockUserEnsemble = [
  {
    _id: new Types.ObjectId(),
    user_id: mockUsers[0]._id.toString(),
    ensemble_id: mockEnsembles[0]._id.toString(),
    joined_at: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    user_id: mockUsers[1]._id.toString(),
    ensemble_id: mockEnsembles[1]._id.toString(),
    joined_at: new Date(),
  },
  // Add more mock user ensembles as needed
];

export default mockUserEnsemble;
