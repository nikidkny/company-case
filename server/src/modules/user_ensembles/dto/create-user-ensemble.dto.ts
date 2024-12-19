import { IsNotEmpty } from 'class-validator';

export class CreateUserEnsemble {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  ensembleId: string;
  @IsNotEmpty()
  joinedAt: Date;
}
