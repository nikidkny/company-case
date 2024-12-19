import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsDate, IsBoolean, IsString, MinLength } from 'class-validator';

//this is what the data the user will need to fill in when creating their profile.
export class CreateUserDto {
  @IsNotEmpty({ message: 'First name should not be empty' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;
  @IsNotEmpty({ message: 'Last name should not be empty' })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password should not be empty' })
  @IsString({ message: 'Last name must be a string' })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Birthdate should not be empty' })
  @Type(() => Date)
  @IsDate({ message: 'Birthdate must be a valid date' })
  birthdate: Date;

  @IsNotEmpty({ message: 'Availability should not be empty' })
  @IsBoolean({ message: 'isAvailable must be a boolean value' })
  isAvailable: boolean;
}
