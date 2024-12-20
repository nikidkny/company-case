import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUser_InstrumentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString({message: "name must be a string"})
  name: string;

  @IsNotEmpty()
  instrumentId: string;

  @IsNotEmpty()
  @IsNumber()
  levelOfExperience: number;

  @IsNotEmpty()
  genres: string[];
}
