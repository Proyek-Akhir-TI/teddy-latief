import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_user')
export class User {

  @PrimaryGeneratedColumn() 
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  profile!: string;
}