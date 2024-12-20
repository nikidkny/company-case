import { Types } from 'mongoose';
import mockUsers from './mockUsers';
import mockEnsembles from './mockEnsembles';
import mockPosts from './mockPosts';

const mockEnsemblePosts = [
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[0]._id.toString(),
    ensembleId: mockEnsembles[0]._id.toString(),
    postId: mockPosts[0]._id.toString(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[1]._id.toString(),
    ensembleId: mockEnsembles[1]._id.toString(),
    postId: mockPosts[1]._id.toString(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[2]._id.toString(),
    ensembleId: mockEnsembles[2]._id.toString(),
    postId: mockPosts[2]._id.toString(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[3]._id.toString(),
    ensembleId: mockEnsembles[3]._id.toString(),
    postId: mockPosts[3]._id.toString(),
  },
  {
    _id: new Types.ObjectId(),
    userId: mockUsers[4]._id.toString(),
    ensembleId: mockEnsembles[5]._id.toString(),
    postId: mockPosts[4]._id.toString(),
  },
];

export default mockEnsemblePosts;
