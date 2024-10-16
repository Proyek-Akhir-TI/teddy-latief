import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TempatWisata } from "./tempat_wisata";

@Entity("tb_aksebilitas")
export class Aksebilitas {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ramp!: boolean;

  @Column()
  toiletKhusus!: boolean;

  @Column()
  parkirKhususDifabel!: boolean;

  @Column()
  jalanKhususDifabel!: boolean;

  @OneToOne(() => TempatWisata, tempatWisata => tempatWisata.aksebilitas)
  @JoinColumn()
  tempatWisata!: TempatWisata; // Kunci asing ke TempatWisata
}
