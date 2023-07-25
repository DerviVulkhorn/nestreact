import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    //Ищем пользователя по email
    const userCheck = await this.usersService.findOne(email);
    
    //Сравниваем с помощью argon2 пароли, так как пароль хеширован
    //(Ищем по паролю)
    const passIsMatch = await argon2.verify(userCheck.password, password)
    if (userCheck && passIsMatch) {
      return userCheck
    }
    throw new BadRequestException('Bad auth users');
  }
  //Используем интерфейс
  async login(user: IUser) {
    //Вытаскиеваем нужные поля
    const {id, email} = user
    //Возвращаем id, email и токен
    return{
      id, 
      email, 
      token: this.jwtService.sign({id:user.id, email:user.email}),
    }
  };

}
