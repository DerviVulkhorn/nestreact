import { IsEmail, MinLength } from 'class-validator'
//Типизация данных для передачи в контроллер
export class CreateUserDto {
    //Если имя меньше 4 символов будет ошибка
    @MinLength(4, {message:'Full name must be more 4 symbols'})
    full_name:string;
    
    //Передаём Email
    @IsEmail()
    email : string;

    //Пароль должен быть больше 6 символов
    @MinLength(6, {message:'Password must be more 6 symbols'})
    password : string;
}
