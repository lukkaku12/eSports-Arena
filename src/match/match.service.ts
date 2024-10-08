import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Match } from './entities/match.entity';
import { PlayerService } from 'src/player/player.service';
import { TournamentService } from 'src/tournament/tournament.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly tournamentService: TournamentService,
    @InjectRepository(Match) private readonly matchRepository: Repository<Match>
  ) {}

  async generateMatches(tournamentId: number): Promise<Match[]> {
    const tournament = await this.tournamentService.findOne(tournamentId);

    // verifies if the tournament matches or exists
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    const players = await this.playerService.findPlayersByTournament(tournamentId);
    
    // Verifica si hay suficientes jugadores
    if (players.length < 2) {
      throw new BadRequestException('Not enough players in the tournament');
    }

    // Genera partidos al azar
    const matches: Match[] = [];
    const statusOptions = ['in_progress', 'finished'];

    for (let i = 0; i < 5; i++) { 
      const player1 = players[Math.floor(Math.random() * players.length)];
      const player2 = players[Math.floor(Math.random() * players.length)];

      
      if (player1.id !== player2.id) {
        const match = new Match();
        match.status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        match.tournament = tournament; 
        match.player1 = player1;
        match.player2 = player2; 
        match.created_at = new Date(); 

        matches.push(match);
      }
    }

   
    return this.saveMatches(matches);
  }

  async saveMatches(matches: Match[]): Promise<Match[]> {
   
    return await this.matchRepository.save(matches);
  }
}