import { IsString } from 'class-validator';
// TODO: add actual validation
export class UpdatePasswordDto {
  @IsString()
  // @MinLength(6)
  currentPassword: string;

  @IsString()
  // @MinLength(6)
  newPassword: string;
}
