import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ){}

  async create(createTransactionDto: CreateTransactionDto, id:number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category:{id: +createTransactionDto.category},
      user: {id:id},
    }
    if(!newTransaction) throw new BadRequestException('Error create transaction')

    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id:number) {
    const transactions = await this.transactionRepository.find({
      where:{
        user : {id:id}
      },
      //Сортировка по дате. DESC - по убыванию
      order:{
        created_at:'DESC',
      }
    })
    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where:{
        id:id
      },
      relations:{
        user:true,
        category:true
      }
    })

    if(!transaction) throw new NotFoundException('Transaction not found!')

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where:{
        id:id
      }
    })

    if(!transaction) throw new NotFoundException('Transaction not found!')

    return await this.transactionRepository.update(id,updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where:{
        id:id
      }
    })

    if(!transaction) throw new NotFoundException('Transaction not found!')

    return await this.transactionRepository.delete(id);
  }

  //=========ПАГИНАЦИЯ = ОПТИМИЗАЦИЯ============
  async findallwithPagination(id:number, page:number, limit:number){
    const transaction = await this.transactionRepository.find({
      //Ищем по id
      where:{
        user:{id}
      },
      //Присоединяем категории и пользоватлей
      relations:{
        category:true,
        user:true
      },
      //Фильтруем
      order:{
        created_at:'DESC'
      },
      //Берём по лимиту, который будет установлен (limit:number (83))
      take: limit,
      //Пропускаем записи при переключении на новую страницу
      skip: (page-1) * limit,
    })

    return transaction;
  }
}
