import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEnsembleDto {
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsNotEmpty()
  @IsOptional()
  description?: string;
  @IsNotEmpty()
  @IsOptional()
  zip?: string;
  @IsArray()
  memberList?: string[];
  @IsString()
  createdBy?: string;
  @IsNotEmpty()
  @IsOptional()
  city?: string;
  @IsNumber()
  numberOfMembers?: number;
  @IsNotEmpty()
  @IsOptional()
  sessionFrequency?: string;
  @IsNotEmpty()
  @IsOptional()
  isPermanent?: boolean;
  @IsOptional()
  activeMusicians?: string;
  @IsOptional()
  genres?: string[];
  @IsOptional()
  webpage?: string;
  @IsOptional()
  image?: string;
  @IsOptional()
  @IsString()
  createdAt?: string;
}
