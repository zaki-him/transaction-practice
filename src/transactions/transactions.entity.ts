import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction')
export class transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  account_id: string

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number

  @Column()
  type: 'WITHDRAWL' | 'DEPOSIT'
}