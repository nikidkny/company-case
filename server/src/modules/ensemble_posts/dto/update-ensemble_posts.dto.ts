import { PartialType } from '@nestjs/mapped-types';
import { CreateEnsemble_PostsDto } from './create-ensemble_posts.dto';

export class UpdateEnsemble_PostsDto extends PartialType(
  CreateEnsemble_PostsDto,
) {}
