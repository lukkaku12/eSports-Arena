import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTournamentScoreDto {

    @IsNotEmpty()
    @IsNumber()
    tournament_id: number;

    @IsNotEmpty()
    @IsNumber()
    playerId: number;

    @IsNotEmpty()
    @IsNumber()
    score: number;
}