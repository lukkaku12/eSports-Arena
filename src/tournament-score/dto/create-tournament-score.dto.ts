import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateTournamentScoreDto {
    @IsNotEmpty()
    @IsUUID()
    tournament_id: string;

    @IsNotEmpty()
    @IsUUID()
    playerId: string;

    @IsNotEmpty()
    @IsNumber()
    score: number;


}