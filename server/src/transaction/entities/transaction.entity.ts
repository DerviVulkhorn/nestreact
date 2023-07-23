import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()

export class Transaction {
    @PrimaryGeneratedColumn({name:'transaction_id'})
    id:number

    //nullable - разрешить ли пустые значения
    @Column({nullable:true})
    type:string
    @Column()
    title:string
    @Column()
    about:string

    //описания даты создания
    @CreateDateColumn()
    created_at:Date;

    //описание даты обновления
    @UpdateDateColumn()
    updated_at:Date;

    //Для связей с User
    @ManyToOne(()=>User,(user)=>user.transactions)
    @JoinColumn({name:'user_id'})
    user:User

    //Для связей с Cotegory
    @ManyToOne(()=>Category,(category)=>category.transaction)
    @JoinColumn({name:'category_id'})
    category:Category
}
