import { PartialType } from '@nestjs/mapped-types';
import { CreatePost_EnsemblesDto } from './create-post_ensemble.dto';

export class UpdatePost_EnsemblesDto extends PartialType(
  CreatePost_EnsemblesDto,
) {}
