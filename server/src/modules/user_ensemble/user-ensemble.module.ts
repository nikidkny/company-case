import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User_Ensemble, User_EnsembleSchema } from './user-ensemble.entity';
import { Ensemble, EnsembleSchema } from '../ensembles/ensemble.entity';
import { UserEnsembleController } from './user-ensemble.controller';
import { UserEnsembleService } from './user-ensemble.service';
import { User, UserSchema } from '../users/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User_Ensemble.name, schema: User_EnsembleSchema },
      { name: Ensemble.name, schema: EnsembleSchema },
      { name: User.name, schema: UserSchema }, 
    ]),
  ],
  controllers: [UserEnsembleController],
  providers: [UserEnsembleService]
})
export class User_EnsembleModule {}
