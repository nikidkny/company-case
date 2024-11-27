import { IsNotEmpty } from 'class-validator';

export class CreateUserEnseble {
  @IsNotEmpty()
  user_id: string; //TODO: check if it is the right type
  @IsNotEmpty()
  ensemble_id: string;//TODO: check if it is the right type
  @IsNotEmpty()
  joined_at: Date;
}
