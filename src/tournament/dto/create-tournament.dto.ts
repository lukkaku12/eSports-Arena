import { IsNotEmpty, IsString, IsOptional, IsAlphanumeric } from 'class-validator';

export class CreateTournamentDto {
  @IsNotEmpty()
  @IsString()
  tournament_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric() // Optional: Ensure the password contains only alphanumeric characters
  password: string;
}