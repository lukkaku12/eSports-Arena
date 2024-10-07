import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard) // Usa el LocalAuthGuard para el login
  @Post('login')
  async login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user);
     // El usuario ya ha sido validado
  }

}
