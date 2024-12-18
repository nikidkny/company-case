import { Module } from '@nestjs/common';
import { Ensemble_PostsService } from './ensemble_posts.service';
import { Ensemble_PostsController } from './ensemble_posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble_Posts, Ensemble_PostsSchema } from './ensemble_posts.entity';
import { Ensemble, EnsembleSchema } from '../ensembles/ensemble.entity';
import { User, UserSchema } from '../users/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble_Posts.name, schema: Ensemble_PostsSchema },
      { name: Ensemble.name, schema: EnsembleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [Ensemble_PostsController],
  providers: [Ensemble_PostsService],
  exports: [Ensemble_PostsService],
})
export class Ensemble_PostsModule {}
