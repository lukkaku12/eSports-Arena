import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEvent } from './entities/tournament-event.entity';
import { CreateTournamentEventDto } from './dto/create-tournament-event.dto';
import { Player } from 'src/player/entities/player.entity';

@Injectable()
export class TournamentEventService {
  constructor(
    @InjectRepository(TournamentEvent)
    private readonly tournamentEventRepository: Repository<TournamentEvent>,
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>
  ) {}

  // Method to find all tournament events
  async findAll(): Promise<TournamentEvent[]> {
    const tournamentEvents = await this.tournamentEventRepository.find();
    if (!tournamentEvents.length) {
      throw new NotFoundException('No tournament events found');
    }
    return tournamentEvents;
  }

  async signIntoTournament(tournamentData: CreateTournamentEventDto, ): Promise<any>{
    const player = await this.playerRepository.findOne({where: {id: tournamentData.playerId}});

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    const newSignIn = {
      tournament_id: tournamentData.tournamentId,
      player_id: tournamentData.playerId,
      joined_at: new Date(),
    }

    return await this.tournamentEventRepository.save(newSignIn)
  }
}