import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Match } from './entities/match.entity';
import { PlayerService } from 'src/player/player.service';
import { TournamentService } from 'src/tournament/tournament.service';
import { Tournament } from 'src/tournament/entities/tournament.entity';
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

    // Verifica si el torneo existe
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

    for (let i = 0; i < 5; i++) { // Generar 5 partidos al azar como ejemplo
      const player1 = players[Math.floor(Math.random() * players.length)];
      const player2 = players[Math.floor(Math.random() * players.length)];

      // Asegúrate de que los jugadores no sean el mismo
      if (player1.id !== player2.id) {
        const match = new Match();
        match.status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        match.tournament = tournament; // Asocia el torneo
        match.player1 = player1; // Asocia el jugador 1
        match.player2 = player2; // Asocia el jugador 2
        match.created_at = new Date(); // Establece la fecha de creación

        matches.push(match);
      }
    }

    // Aquí asumes que tienes un método para guardar los partidos
    return this.saveMatches(matches);
  }

  async saveMatches(matches: Match[]): Promise<Match[]> {
    // Lógica para guardar los partidos en la base de datos
    // Por ejemplo, puedes usar TypeORM para persistir los partidos
    return await this.matchRepository.save(matches); // Asume que matchRepository está definido
  }
}