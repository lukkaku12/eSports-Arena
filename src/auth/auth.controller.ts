import { Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard) 
  @Post('login')
  async login(@Request() req) {
    console.log(req.user)
    return this.authService.login(req.user);
     
  }

}
