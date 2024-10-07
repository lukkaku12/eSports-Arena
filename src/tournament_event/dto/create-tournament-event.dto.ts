import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateTournamentEventDto {
  @IsNotEmpty()
  @IsNumber()
  tournament_id: number; // Tournament ID associated with the event

  @IsNotEmpty()
  @IsNumber()
  player_id: number; // Player ID who joined the tournament

  @IsNotEmpty()
  @IsDate()
  joined_at: Date; // Date when the player joined the tournament
}