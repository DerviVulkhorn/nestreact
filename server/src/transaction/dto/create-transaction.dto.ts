import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "src/category/entities/category.entity"
import { User } from "src/user/entities/user.entity"

export class CreateTransactionDto {
    @IsNotEmpty()
    title:string

    //"@..." можно вешать несколько сразу
    @IsNotEmpty()
    @IsNumber()
    amount:number

    @IsString()
    //Nest автоматически позволит передать только 2 параметра
    //expense или income
    type:'expense' | 'income'

    @IsNotEmpty()
    category : Category
    
    //НЕ ЗАБЫВАТЬ!
    @IsOptional()
    user?: User;
}
