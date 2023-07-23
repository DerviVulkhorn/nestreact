import { Transaction } from "src/transaction/entities/transaction.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()

export class Category {
    //Задаём имя для бд, но в коде всё равно будет id
    @PrimaryGeneratedColumn({name:'category_id'})
    id:number

    @Column()
    title:string

    //Связь многим ко одному
    @ManyToOne(()=>User, (user)=>user.categories)
    //Присоеденяем колонку
    @JoinColumn({name:'user_id'})
    user:User

    //Связб с транзациями
    @OneToMany(()=>Transaction, (transaction)=>transaction.category)
    transaction: Transaction[]

    //описания даты создания
    @CreateDateColumn()
    created_at:Date;

    //описание даты обновления
    @UpdateDateColumn()
    updated_at:Date;
}
