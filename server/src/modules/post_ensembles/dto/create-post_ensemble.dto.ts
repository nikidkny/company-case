import { IsNotEmpty } from 'class-validator';

export class CreatePost_EnsemblesDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  ensembleId: string;
  @IsNotEmpty()
  postId: string;
}
