import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMatchDto {
    
    @IsString()
    status: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    created_at?: Date;

    @IsNumber()
    tournament_id: number;

    @IsNumber()
    player_1_id: number;

    @IsNumber()
    player_2_id: number;
}