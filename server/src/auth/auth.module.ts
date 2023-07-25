import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategeis/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategeis/jwt.strategy';

@Module({
  imports:[UserModule, PassportModule, JwtModule.registerAsync({
    //Вытягивем токен из env файла
    imports:[ConfigModule],
    useFactory:(configService:ConfigService)=> ({
      //Заносим в переменную secret библиотеки 
      secret: configService.get('JWT_SECRET'),
      //Токен действует 30 дней
      signOptions:{expiresIn:'30d'}
    }),
    //НЕ ЗАБЫВАТЬ!
    inject:[ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
