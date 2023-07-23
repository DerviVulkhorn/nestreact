//Данный класс позволяет создать таблицу в базе данных
import { Category } from "src/category/entities/category.entity";
import {Transaction} from "src/transaction/entities/transaction.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//Создаём декоратор
@Entity()

export class User {
    //Из typeorm:

    //первичный ключ
    @PrimaryGeneratedColumn()
    id:number;

    //описания колонок
    @Column()
    full_name:string;
    @Column()
    email:string;
    @Column()
    password:string;

    //описания даты создания
    @CreateDateColumn()
    created_at:Date;

    //описание даты обновления
    @UpdateDateColumn()
    updated_at:Date;

    //Зависимость один ко многим, смотри далее в category.entity.ts
    //onDelete - что будет с зависимыми записями (CASCADE - удалить зависимые)
    @OneToMany(()=> Category,(category)=>category.user, {onDelete:'CASCADE'})
    categories:Category[]

    //Для связей в транзакции
    @OneToMany(()=>Transaction, (transaction)=>transaction.user, {onDelete:'CASCADE'})
    transactions: Transaction[]
    
}
