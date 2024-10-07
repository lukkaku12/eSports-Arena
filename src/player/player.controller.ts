import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreateUserDto } from './dto/create-user.dto'; // Asegúrate de que el DTO exista para los datos del jugador
import { Player } from './entities/player.entity'; // Importa la entidad Player
import { ApiTags } from '@nestjs/swagger';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreateUserDto): Promise<Player> {
    try {
      return await this.playerService.createPlayer(createPlayerDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}