import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TempatWisata } from "./tempat_wisata";

@Entity("tb_gambar") 
export class Gambar {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  url!: string

  @ManyToOne(() => TempatWisata, tempatWisata => tempatWisata.gambar)
  tempatWisata!: TempatWisata
}