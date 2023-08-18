import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transferentity1692352074486 implements MigrationInterface {
  name = 'Transferentity1692352074486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL, "hubId" integer NOT NULL, "dockId" integer NOT NULL, "dispenserId" integer NOT NULL, "recipeId" integer NOT NULL, "deviceId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "deviceId") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "deviceId" FROM "transfer"`,
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
      `CREATE TABLE "transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL, "hubId" text, "dockId" text, "dispenserId" text, "recipeId" text, "deviceId" text)`,
    );
    await queryRunner.query(
      `INSERT INTO "transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "deviceId") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "deviceId" FROM "temporary_transfer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_transfer"`);
  }
}
