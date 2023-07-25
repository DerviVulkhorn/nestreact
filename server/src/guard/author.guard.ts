//Проверка авторства пользователя
// import {CanActivate, ExecutionContext, NotFoundException} from "@nestjs/common"

// export class AuthorGuard implements CanActivate {
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         //Логика "Являемся ли мы автором поста"
//         //Получаем любой запрос
//         const request = context.switchToHttp().getRequest
//         const {id, type} = request.params

//         let entity

//         switch (type) {
//             case "transaction":
                
//                 break;
//             case "category":
                
//                 break;
//             default:
//                 throw new NotFoundException('Something went wrong...')
//                 break;
//         }

//         return true
//     }
// }