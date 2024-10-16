import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aksebilitas } from "./aksebilitas";
import { Gambar } from "./gambar";

@Entity("tb_tempat_wisata")
export class TempatWisata {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  namaTempatWisata!: string;

  @Column("decimal", { precision: 11, scale: 8 })
  longitude!: string;

  @Column("decimal", { precision: 11, scale: 8 })
  latitude!: string;

  @Column()
  rating!: number;

  @Column()
  harga!: number;

  @Column()
  jenisWisata!: string;

  @Column()
  deskripsi!: string;

  @OneToMany(() => Gambar, gambar => gambar.tempatWisata)
  gambar!: Gambar[];

  @OneToOne(() => Aksebilitas, aksebilitas => aksebilitas.tempatWisata)
  aksebilitas!: Aksebilitas;
}
