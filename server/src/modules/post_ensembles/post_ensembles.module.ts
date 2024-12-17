import { Module } from '@nestjs/common';
import { Post_EnsemblesService } from './post_ensembles.service';
import { Post_EnsemblesController } from './post_ensembles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post_Ensembles, Post_EnsemblesSchema } from './post_ensemble.entity';
import { Ensemble, EnsembleSchema } from '../ensembles/ensemble.entity';
import { User, UserSchema } from '../users/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post_Ensembles.name, schema: Post_EnsemblesSchema },
      { name: Ensemble.name, schema: EnsembleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [Post_EnsemblesController],
  providers: [Post_EnsemblesService],
  exports: [Post_EnsemblesService],
})
export class Post_EnsemblesModule {}
