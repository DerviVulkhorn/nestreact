// Проверка авторства пользователя
import {BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException} from "@nestjs/common"
import { CategoryService } from "src/category/category.service";
import { TransactionService } from "src/transaction/transaction.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly transctionService: TransactionService,
        private readonly categoryService: CategoryService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //Логика "Являемся ли мы автором поста"
        //Получаем любой запрос
        const request = context.switchToHttp().getRequest()
        const {id, type} = request.params

        let entity

        switch (type) {
            //Когда в url запросе поймали transaction
            case "transaction":
                entity = await this.transctionService.findOne(id)
                break;
            case "category":
                entity = await this.categoryService.findOne(id)
                break;
            default:
                throw new NotFoundException('Something went wrong...')
                break;
        }

        const user = request.user
        //Проверяем получаемые параметры и пользователя, а так же сравниваем их
        //Если транзакция или категория была сделена не тем пользователем, который
        //создавал изменения, то мы возвращаем false
        if(entity && user && entity.user.id === user.id){
            return true
        }

        throw new BadRequestException('Something went wrong...')
    }
}