import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
//Импортируем argon2
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  //Добавление конструктора
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    //Добавляем JWT для регистрации, чтобы возвращать токен
    private readonly jwtService: JwtService,
  ){}


  //Создание пользователя
  async create(createUserDto: CreateUserDto) {
    //Перед тем как создать пользователя, поискать в userRepository одного пользователя
    const existUser = await this.userRepository.findOne({
      //где email совпадает с тем email, который передаём (createUserDto.email)
      where:{
        email: createUserDto.email
      }
    })
    //Если пользователь найден отправляем ошибку
    if (existUser) throw new BadRequestException('Этот email уже существует')
    //Если не найдено, то передаём данные из createUserDto
    const user = await this.userRepository.save({
      full_name:createUserDto.full_name,
      email:createUserDto.email,
      //для хеширования пароля ставим npm i argon2
      password:await argon2.hash(createUserDto.password)
    })

    const token = this.jwtService.sign({email: createUserDto.email})

    return {user, token};
  }


  findAll() {
    return `This action returns all user`;
  }


  //Ищем пользователя у которого email совпадает с email в БД
  async findOne(email: string) {
    return await this.userRepository.findOne({where:{
      email:email
    }})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
