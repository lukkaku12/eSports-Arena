import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/player/dto/create-user.dto'; 
import { PlayerService } from '../player/player.service'; 
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService
  ) {
  }

  async createPlayer(createPlayer: CreateUserDto) {
    try {
      return await this.playerService.createPlayer(createPlayer); 
    } catch (error) {
      throw new BadRequestException(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async validatePlayer(email: string, password: string): Promise<any> {
    const player = await this.playerService.findByEmail(email); 
    
    
    if (!player) {
      return null;
    }

   
    const isPasswordValid = await bcrypt.compare(password, player.password);
    if (!isPasswordValid) {
      return null;
    }

    
    const { password: _password, ...result } = player;
    return result;
  }

  async login(player: any) {
    const payload = { username: player.email, sub: player.id };
    return {
      access_token: this.jwtService.sign(payload), 
    };
  }
}