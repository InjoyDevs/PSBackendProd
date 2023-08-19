import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransferTable1692384569182 implements MigrationInterface {
  name = 'TransferTable1692384569182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" integer NOT NULL, "hubId" integer NOT NULL, "dockId" integer NOT NULL, "dispenserId" integer NOT NULL, "recipeId" integer NOT NULL, "recipe" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe" FROM "transfer"`,
    );
    await queryRunner.query(`DROP TABLE "transfer"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_transfer" RENAME TO "transfer"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfer" RENAME TO "temporary_transfer"`,
    );
    await queryRunner.query(
      `CREATE TABLE "transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL, "hubId" text, "dockId" text, "dispenserId" text, "recipeId" text, "recipe" text)`,
    );
    await queryRunner.query(
      `INSERT INTO "transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe" FROM "temporary_transfer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_transfer"`);
  }
}
