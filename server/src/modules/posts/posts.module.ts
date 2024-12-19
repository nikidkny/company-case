import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './post.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Ensemble_Posts,
  Ensemble_PostsSchema,
} from '../ensemble_posts/ensemble_posts.entity';
import { Ensemble, EnsembleSchema } from '../ensembles/ensemble.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Ensemble_Posts.name, schema: Ensemble_PostsSchema },
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
