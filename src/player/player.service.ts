import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity'; // Ensure the path is correct
import { CreateUserDto } from './dto/create-user.dto'; // Ensure you have the appropriate DTO for creating players
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { TournamentScore } from 'src/tournament-score/entities/tournament-score.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(TournamentScore) private readonly tournamentScoreRepository: Repository<TournamentScore>, // Inject the TypeORM repository for Player
  ) {}

  // Method to create a player
  async createPlayer(createPlayerDto: CreateUserDto): Promise<Player> {
    const { name, email, password } = createPlayerDto;

    // Check if the player already exists
    const existingPlayer = await this.playerRepository.findOne({ where: { email } });
    if (existingPlayer) {
      throw new BadRequestException('Player with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new player
    const player = this.playerRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.playerRepository.save(player);
  }

  // Method to find a player by email
  async findByEmail(email: string): Promise<Player | undefined> {
    return this.playerRepository.findOne({ where: { email } });
  }

  // Method to find a player by ID
  async findById(id: number): Promise<Player | undefined> {
    return this.playerRepository.findOne({ where: { id } });
  }

  // Method to update a player
  async updatePlayer(id: number, updateData: Partial<CreateUserDto>): Promise<Player> {
    const player = await this.findById(id);
    if (!player) {
      throw new BadRequestException('Player not found');
    }

    // Update the player's properties
    Object.assign(player, updateData);

    return this.playerRepository.save(player);
  }

  // Method to delete a player
  async deletePlayer(id: number): Promise<void> {
    const player = await this.findById(id);
    if (!player) {
      throw new BadRequestException('Player not found');
    }

    await this.playerRepository.delete(id);
  }

  // Method to find all players
  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findPlayersByTournament(tournamentId: number): Promise<Player[]> {
    const tournamentScores = await this.tournamentScoreRepository.find({
      where: { tournamentId: tournamentId },
      relations: ['player'], // Ensure that the relation to Player is set up correctly in the TournamentScore entity
    });

    if (!tournamentScores.length) {
      throw new NotFoundException(`No players found for tournament with id ${tournamentId}`);
    }

    // Extract unique player IDs from tournament scores
    const playerIds = tournamentScores.map(score => score.player.id);
    return this.playerRepository.findByIds(playerIds);
  }
}