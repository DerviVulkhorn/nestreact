import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }
  //===================Получаем товар по типу======================================
  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req, @Param('type') type:string){
    return this.transactionService.findAllByType(+req.user.id, type)
  }
  //===============================================================================

  //=========================Пагинация======================================
  //Запрос на пагинацию
  //url/transaction/pagination?page=1?limit=3
  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findallwithPagination(
    @Req() req, 
    //Можно установить значение "по умолчанию"
    @Query('page') page:number = 1, 
    @Query('limit') limit:number = 3
    ){
    return this.transactionService.findallwithPagination(+req.user.id, +page, +limit)
  }
  //=======================================================================

  @Get()
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id);
  }
  //Тут type принимет либо категорию либо транзакцию
  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

}
