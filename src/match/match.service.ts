import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Match } from './entities/match.entity';
import { PlayerService } from 'src/player/player.service';
import { TournamentService } from 'src/tournament/tournament.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'src/results/entities/result.entity';

@Injectable()
export class MatchService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly tournamentService: TournamentService,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async generateMatches(tournamentId: number): Promise<Match[]> {
    const tournament = await this.tournamentService.findOne(tournamentId);

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    const players =
      await this.playerService.findPlayersByTournament(tournamentId);

    if (players.length < 2) {
      throw new BadRequestException('Not enough players in the tournament');
    }

    const matches: Match[] = [];
    const statusOptions = ['in_progress', 'finished'];

    for (let i = 0; i < players.length; i++) {
        const player1 = players[Math.floor(Math.random() * players.length)];
        const player2 = players[Math.floor(Math.random() * players.length)];
      
        
        if (player1.id !== player2.id) {
          const match = new Match();
          match.status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
          match.tournament = tournament;
          match.player1 = player1;
          match.player2 = player2;
          match.created_at = new Date();
      
          
          const savedMatch = await this.matchRepository.save(match);
          matches.push(savedMatch); 
          

        if (match.status.includes('finished')) {
            try {
                const winnerScore = Math.floor(Math.random() * 100); 
                const loserScore = Math.floor(Math.random() * winnerScore);
        
               
                const player1 = await this.playerService.findOne(match.player1.id); 
                const player2 = await this.playerService.findOne(match.player2.id);
               
                if (!player1 || !player2) {
                    throw new BadRequestException('Players not found');
                }
                
                
                const result = new Result();
                result.winner_score = winnerScore;
                result.loser_score = loserScore;
                result.created_at = new Date();
                result.match = match; 
                result.winner = player1; 
                result.loser = player2; 
                
            
                this.resultRepository.create(result)
                
                await this.resultRepository.save(result);
            } catch (error) {
                throw new BadRequestException(error.message);
            }
        }
      }
    }

    return this.saveMatches(matches);
  }

  async saveMatches(matches: Match[]): Promise<Match[]> {
    
    return await this.matchRepository.save(matches);
  }
}
