import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Current password should not be empty' })
  @MinLength(8, { message: 'Current password must be at least 8 characters long' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'New password should not be empty' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  newPassword: string;
}
