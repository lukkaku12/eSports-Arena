import { PartialType } from '@nestjs/swagger';
import { CreateTournamentScoreDto } from './create-tournament-score.dto';

export class UpdateTournamentScoreDto extends PartialType(CreateTournamentScoreDto) {}
