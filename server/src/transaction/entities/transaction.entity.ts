import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Transaction {
    @PrimaryGeneratedColumn({name:'transaction_id'})
    id:number

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
}
