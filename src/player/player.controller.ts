import { Controller, Post, Body, BadRequestException, UseInterceptors } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreateUserDto } from './dto/create-user.dto'; // Asegúrate de que el DTO exista para los datos del jugador
import { Player } from './entities/player.entity'; // Importa la entidad Player
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('player')
@Controller('player')
@UseInterceptors(ResponseInterceptor)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('register')
  async createPlayer(@Body() createPlayerDto: CreateUserDto): Promise<Player> {
    try {
      return await this.playerService.createPlayer(createPlayerDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}