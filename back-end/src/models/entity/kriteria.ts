import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum StatusKriteria {
  BENEFIT = "Benefit",
  COST = "Cost",
}

@Entity('tb_kriteria')
export class Kriteria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nama_kriteria!: string;

  @Column('float')
  bobot_kriteria!: number;

  @Column({
    type: 'enum',
    enum: StatusKriteria,
  })
  Jenis_Kriteria!: StatusKriteria;
}
