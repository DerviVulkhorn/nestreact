import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Для чтения env файлов
import { ConfigModule, ConfigService } from '@nestjs/config';
//Импортируем модули
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule, 
    CategoryModule, 
    AuthModule, 
    TransactionModule,
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService : ConfigService)=>({
        type:'postgres',
        //Подключаем .env файл
        host:configService.get('DB_HOST'),
        port:configService.get('DB_PORT'),
        username:configService.get('DB_USERNAME'),
        password:configService.get('DB_PASSWORD'),
        database:configService.get('DB_NAME'),
        synchronize:true,
        //__dirname - отслеживать текущую папку, /**/*.entity{.js,.ts} - следить за всеми
        //файлами в названии которых есть .entity
        entities:[__dirname+'/**/*.entity{.js,.ts}'],
      }),
      //Чтобы не ругался на get
      inject:[ConfigService],
    })
  ],
    
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
