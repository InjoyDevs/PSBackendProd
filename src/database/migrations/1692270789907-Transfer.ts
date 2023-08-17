import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transfer1692270789907 implements MigrationInterface {
  name = 'Transfer1692270789907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL, "hubId" integer NOT NULL, "dockId" integer NOT NULL, "dispenserId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId" FROM "transfer"`,
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
      `CREATE TABLE "transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL, "hubId" text, "dockId" text, "dispenserId" text)`,
    );
    await queryRunner.query(
      `INSERT INTO "transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId" FROM "temporary_transfer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_transfer"`);
  }
}
