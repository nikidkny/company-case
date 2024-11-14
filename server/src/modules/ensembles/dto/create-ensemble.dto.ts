import { IsNotEmpty } from 'class-validator';

//this is what the data the user will need to fill in when creating the ensemble. Very basic validation for now
export class CreateEnsembleDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  sessionFrequency: string;
  @IsNotEmpty()
  isPermanent: boolean;
  numberOfMembers: number;
  genre: string[];
  webpage: string;
  image: string;
}
