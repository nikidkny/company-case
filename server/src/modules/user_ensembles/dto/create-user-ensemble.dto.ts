import { IsNotEmpty } from 'class-validator';

export class CreateUserEnseble {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  ensembleId: string;
  @IsNotEmpty()
  joinedAt: Date;
}
