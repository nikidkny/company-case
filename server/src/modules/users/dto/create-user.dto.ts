import { IsNotEmpty, IsEmail } from 'class-validator';

//this is what the data the user will need to fill in when creating their profile. Very basic validation for now
export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  birthdate: Date;
  @IsNotEmpty()
  isAvailable: boolean;
}
