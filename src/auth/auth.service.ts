import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/player/dto/create-user.dto'; // Asegúrate de cambiar CreateUserDto por la versión correcta para Player
import { PlayerService } from '../player/player.service'; // Cambiar a PlayerService
import * as bcrypt from 'bcrypt'; // Importa bcrypt para la comparación de contraseñas
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly playerService: PlayerService, // Cambiado de UsersService a PlayerService
    private readonly jwtService: JwtService
  ) {
  }

  async createPlayer(createPlayer: CreateUserDto) {
    try {
      return await this.playerService.createPlayer(createPlayer); // Delegar a PlayerService
    } catch (error) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async validatePlayer(email: string, password: string): Promise<any> {
    const player = await this.playerService.findByEmail(email); // Cambiar método para buscar por Email en PlayerService
    
    // Si el jugador no existe
    if (!player) {
      return null;
    }

    // Compara las contraseñas (asumiendo que están encriptadas)
    const isPasswordValid = await bcrypt.compare(password, player.password);
    if (!isPasswordValid) {
      return null;
    }

    // Si las credenciales son correctas, regresa el jugador (sin la contraseña)
    const { password: _password, ...result } = player;
    return result;
  }

  async login(player: any) {
    const payload = { username: player.email, sub: player.id };
    return {
      access_token: this.jwtService.sign(payload), // Firma el token
    };
  }
}