import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResultDto {
    @IsNotEmpty()
    matchId: number;

    @IsNumber()
    winner_score: number;

    @IsNumber()
    loser_score: number;

    @IsNotEmpty()
    winnerId: number;

    @IsNotEmpty()
    loserId: number;
}