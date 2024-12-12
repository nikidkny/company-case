import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthdate?: Date;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  description?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  zip?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastLoggedIn?: Date;

  @IsOptional()
  @IsBoolean()
  isNewsletter?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
