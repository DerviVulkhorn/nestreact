import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  //Импортируем 
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
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
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  //Экспортируем для того чтобы использовать в auth модуле
  exports: [UserService],
})
export class UserModule {}
