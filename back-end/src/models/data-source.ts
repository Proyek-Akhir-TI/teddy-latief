import "reflect-metadata";
import { DataSource } from "typeorm";
import { TempatWisata } from "./entity/tempat_wisata";
import { Kriteria } from "./entity/kriteria";
import { Aksebilitas } from "./entity/aksebilitas";
import { Gambar } from "./entity/gambar";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "db_tempat_wisata",
  synchronize: false,
  logging: true,
  entities: [TempatWisata, Kriteria, Aksebilitas, Gambar, User],
  migrations: ["./src/migration/*.ts"],
  migrationsTableName: "MigrateTable",
})