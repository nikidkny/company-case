import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class GetMembersDetailsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  membersIds: string[];
  @IsString()
  creatorId: string;
}
