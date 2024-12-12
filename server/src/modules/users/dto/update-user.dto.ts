import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'First name should not be empty' })
  @IsString({ message: 'First name must be a string' })
  firstName?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Last name should not be empty' })
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Confirm password should not be empty' })
  confirmPassword?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Birthdate should not be empty' })
  @Type(() => Date)
  @IsDate({ message: 'Birthdate must be a valid date' })
  birthdate?: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'Availability should not be empty' })
  @IsBoolean({ message: 'isAvailable must be a boolean value' })
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
