import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1722964060455 implements MigrationInterface {
    name = 'NewMigration1722964060455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tb_aksebilitas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ramp\` tinyint NOT NULL, \`toiletKhusus\` tinyint NOT NULL, \`parkirKhususDifabel\` tinyint NOT NULL, \`jalanKhususDifabel\` tinyint NOT NULL, \`tempatWisataId\` int NULL, UNIQUE INDEX \`REL_46da5083aed45499c4c2ef4f2f\` (\`tempatWisataId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_gambar\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`tempatWisataId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_tempat_wisata\` (\`id\` int NOT NULL AUTO_INCREMENT, \`namaTempatWisata\` varchar(255) NOT NULL, \`longitude\` decimal(11,8) NOT NULL, \`latitude\` decimal(11,8) NOT NULL, \`rating\` int NOT NULL, \`harga\` int NOT NULL, \`jenisWisata\` varchar(255) NOT NULL, \`deskripsi\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_kriteria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nama_kriteria\` varchar(255) NOT NULL, \`bobot_kriteria\` float NOT NULL, \`Jenis_Kriteria\` enum ('Benefit', 'Cost') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tb_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`profile\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tb_aksebilitas\` ADD CONSTRAINT \`FK_46da5083aed45499c4c2ef4f2fd\` FOREIGN KEY (\`tempatWisataId\`) REFERENCES \`tb_tempat_wisata\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tb_gambar\` ADD CONSTRAINT \`FK_3d89f6e530a1401bf356e1361f0\` FOREIGN KEY (\`tempatWisataId\`) REFERENCES \`tb_tempat_wisata\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tb_gambar\` DROP FOREIGN KEY \`FK_3d89f6e530a1401bf356e1361f0\``);
        await queryRunner.query(`ALTER TABLE \`tb_aksebilitas\` DROP FOREIGN KEY \`FK_46da5083aed45499c4c2ef4f2fd\``);
        await queryRunner.query(`DROP TABLE \`tb_user\``);
        await queryRunner.query(`DROP TABLE \`tb_kriteria\``);
        await queryRunner.query(`DROP TABLE \`tb_tempat_wisata\``);
        await queryRunner.query(`DROP TABLE \`tb_gambar\``);
        await queryRunner.query(`DROP INDEX \`REL_46da5083aed45499c4c2ef4f2f\` ON \`tb_aksebilitas\``);
        await queryRunner.query(`DROP TABLE \`tb_aksebilitas\``);
    }

}
