import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number

  @VersionColumn()
  version: number
}