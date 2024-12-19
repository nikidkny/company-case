import { Types } from 'mongoose';
import mockUsers from './mockUsers';
import mockEnsembles from './mockEnsembles';
import mockPosts from './mockPosts';

const mockEnsemblePosts = [
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[0]._id,
    ensembleId: mockEnsembles[0]._id,
    postId: mockPosts[0]._id,
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[1]._id,
    ensembleId: mockEnsembles[1]._id,
    postId: mockPosts[1]._id,
  },
  // Add more mock ensemble posts as needed
];

export default mockEnsemblePosts;
