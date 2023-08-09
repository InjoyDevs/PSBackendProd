import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedInventory implements MigrationInterface {
  name = 'ChangedInventory.ts1691346802599';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceIdId" integer, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL, "level" integer NOT NULL, "currentLevel" float NOT NULL, CONSTRAINT "UQ_e04a8f609e3fe61e7c6d2a034d8" UNIQUE ("deviceIdId"), CONSTRAINT "FK_e14dfae414171de387d8942d6d0" FOREIGN KEY ("deviceIdId") REFERENCES "device" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_inventory"("id", "deviceIdId", "ingredientId", "currentVolume", "capacity") SELECT "id", "deviceIdId", "ingredientId", "currentVolume", "capacity" FROM "inventory"`,
    );
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_inventory" RENAME TO "inventory"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventory" RENAME TO "temporary_inventory"`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceIdId" integer, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL, CONSTRAINT "UQ_e04a8f609e3fe61e7c6d2a034d8" UNIQUE ("deviceIdId"), CONSTRAINT "FK_e14dfae414171de387d8942d6d0" FOREIGN KEY ("deviceIdId") REFERENCES "device" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "inventory"("id", "deviceIdId", "ingredientId", "currentVolume", "capacity") SELECT "id", "deviceIdId", "ingredientId", "currentVolume", "capacity" FROM "temporary_inventory"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_inventory"`);
  }
}
