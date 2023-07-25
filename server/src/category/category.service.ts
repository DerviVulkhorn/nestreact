import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository:Repository<Category> 
  ){}
  
  //Создаём новую категорию от лица пользователя
  async create(createCategoryDto: CreateCategoryDto, id:number) {
    const isExist = await this.categoryRepository.findBy({
      user: {id:id},
      title: createCategoryDto.title
    })

    if(isExist.length) throw new BadRequestException('This category alreade exist.')

    const newCategory = {
      title: createCategoryDto.title,
      user:{
        id,
      },
    }

    return await this.categoryRepository.save(newCategory);
  }

  //Ищем все категории конкретного пользователя
  async findAll(id:number) {
    //Вывести все категории, пользователя находя его по id
    return await this.categoryRepository.find({
      where:{
        user:{id},
      },
      //Подцепляем транзакции, к которым они относяться
      relations:{
        transaction:true
      }
    });
  }

  //Ищем одну категорию
  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {id},
      //Подключаем информацию об пользователе и о транзакциях
      relations:{
        user:true,
        transaction:true
      }
    })

    //Проверка
    if(!category) throw new NotFoundException('Category not found')

    //Если проверку прошли
    return category;
  }

  //Обновление категории
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    //Находим категорию по id
    const category = await this.categoryRepository.findOne({
      where:{id:id},
    })
    //Если не найдено то ошибка
    if(!category) throw new NotFoundException('Category not found')
    //Если найдена то обновляем
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where:{id:id}
    })

    //Если не найдено то ошибка
    if(!category) throw new NotFoundException('Category not found')

    return await this.categoryRepository.delete(id);
  }
}
