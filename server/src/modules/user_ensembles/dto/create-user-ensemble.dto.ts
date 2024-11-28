import { IsNotEmpty } from 'class-validator';

export class CreateUserEnseble {
  @IsNotEmpty()
  user_id: string;
  @IsNotEmpty()
  ensemble_id: string;
  @IsNotEmpty()
  joined_at: Date;
}