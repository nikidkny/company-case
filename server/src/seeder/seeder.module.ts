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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Ensemble.name, schema: EnsembleSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
