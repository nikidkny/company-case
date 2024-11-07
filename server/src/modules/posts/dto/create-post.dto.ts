import { IsNotEmpty } from 'class-validator';

//this is what the data the user will need to fill in when creating a post
export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  instrument: string;
  @IsNotEmpty()
  location: string;
  webpage: string;
  experienceRequired: string;
}
