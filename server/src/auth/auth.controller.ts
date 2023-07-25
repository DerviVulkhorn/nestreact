import { Controller, Post, UseGuards,Request, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Вызываем проверку на пользователя
  @UseGuards(LocalAuthGuard)
  @Post('login')
  //Запрос на логин
  async login(@Request() req) {
    //возвращаем login, куда предаём запрос "user"
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
