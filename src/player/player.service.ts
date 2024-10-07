import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity'; // Asegúrate de tener la entidad Player importada correctamente
import { CreateUserDto } from './dto/create-user.dto'; // Cambiar si tienes un DTO específico para crear jugadores
import * as bcrypt from 'bcrypt'; // Importa bcrypt para la encriptación de contraseñas
import { TournamentScore } from 'src/tournament-score/entities/tournament-score.entity'; // Asegúrate de importar correctamente

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>, // Inyectamos el repositorio de TypeORM para Player
    @InjectRepository(TournamentScore)
    private readonly tournamentScoreRepository: Repository<TournamentScore>, // Inyectamos el repositorio de TypeORM para TournamentScore
  ) {}

  // Método para crear un jugador
  async createPlayer(createPlayerDto: CreateUserDto): Promise<Player> {
    const { name, email, password } = createPlayerDto;

    // Verifica si el jugador ya existe
    const existingPlayer = await this.playerRepository.findOne({ where: { email } });
    if (existingPlayer) {
      throw new BadRequestException('Player with this email already exists');
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el nuevo jugador
    const player = this.playerRepository.create({
      name,
      email,
      password: hashedPassword,
      created_at: new Date(), // Genera la fecha automáticamente
    });

    return this.playerRepository.save(player);
  }

  // Método para encontrar un jugador por email
  async findByEmail(email: string): Promise<Player | undefined> {
    return this.playerRepository.findOne({ where: { email } });
  }

  // Método para encontrar un jugador por ID
  async findById(id: number): Promise<Player | undefined> {
    return this.playerRepository.findOne({ where: { id } });
  }

  // Método para actualizar un jugador
  async updatePlayer(id: number, updateData: Partial<CreateUserDto>): Promise<Player> {
    const player = await this.findById(id);
    if (!player) {
      throw new BadRequestException('Player not found');
    }

    // Actualiza los datos del jugador
    Object.assign(player, updateData);

    return this.playerRepository.save(player);
  }

  // Método para eliminar un jugador
  async deletePlayer(id: number): Promise<void> {
    const player = await this.findById(id);
    if (!player) {
      throw new BadRequestException('Player not found');
    }

    await this.playerRepository.delete(id);
  }

  // Método para encontrar jugadores por torneo
  async findPlayersByTournament(tournamentId: number): Promise<Player[]> {
    const tournamentScores = await this.tournamentScoreRepository.find({
      where: { tournament_id: tournamentId },
      relations: ['player'], // Asegúrate de tener la relación adecuada en TournamentScore
    });

    if (!tournamentScores.length) {
      throw new BadRequestException(`No players found for tournament with id ${tournamentId}`);
    }

    // Extrae los jugadores únicos de los puntajes del torneo
    const playerIds = tournamentScores.map(score => score.player.id);
    return this.playerRepository.findByIds(playerIds);
  }
}