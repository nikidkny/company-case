import { IsNotEmpty } from 'class-validator';

export class CreateEnsemble_PostsDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  ensembleId: string;
  @IsNotEmpty()
  postId: string;
}
