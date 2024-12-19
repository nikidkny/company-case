import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Ensemble,
  EnsembleSchema,
} from 'src/modules/ensembles/ensemble.entity';
import { Post, PostSchema } from 'src/modules/posts/post.entity';
import { User, UserSchema } from 'src/modules/users/user.entity';
import {
  User_Instrument,
  User_InstrumentSchema,
} from 'src/modules/user_Instruments/user_Instrument.entity';
import {
  Ensemble_Posts,
  Ensemble_PostsSchema,
} from 'src/modules/ensemble_posts/ensemble_posts.entity';
import {
  Instrument,
  InstrumentSchema,
} from 'src/modules/instruments/instrument.entity';
import {
  User_Ensemble,
  User_EnsembleSchema,
} from 'src/modules/user_ensembles/user-ensemble.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Ensemble.name, schema: EnsembleSchema },
      { name: Post.name, schema: PostSchema },
      { name: User_Instrument.name, schema: User_InstrumentSchema },
      { name: Ensemble_Posts.name, schema: Ensemble_PostsSchema },
      { name: Instrument.name, schema: InstrumentSchema },
      { name: User_Ensemble.name, schema: User_EnsembleSchema },
    ]),
  ],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
