import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeviceTable1691771160922 implements MigrationInterface {
  name = 'CreateDeviceTable1691771160922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "advs_mv_parts_link" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "part_id" integer NOT NULL, "induction_date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sys_cat_config_n_values" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "type" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceIdId" integer, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL, "level" integer NOT NULL, CONSTRAINT "UQ_e04a8f609e3fe61e7c6d2a034d8" UNIQUE ("deviceIdId"), CONSTRAINT "FK_e14dfae414171de387d8942d6d0" FOREIGN KEY ("deviceIdId") REFERENCES "device" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_inventory"("id", "deviceIdId", "ingredientId", "currentVolume", "capacity", "level") SELECT "id", "deviceIdId", "ingredientId", "currentVolume", "capacity", "level" FROM "inventory"`,
    );
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_inventory" RENAME TO "inventory"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" integer NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "device_type" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" text, "created_at" text NOT NULL, "updated_at" text NOT NULL, "inventoryLevel" integer NOT NULL, "capacity" integer NOT NULL, "inventory" text, "inventoryId" integer NOT NULL, "current_location" text, "security_alert_level" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_device"("id", "location", "pumpData", "dockDetails", "digitalSignature") SELECT "id", "location", "pumpData", "dockDetails", "digitalSignature" FROM "device"`,
    );
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_device" RENAME TO "device"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" integer NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "device_type" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" text, "created_at" text NOT NULL, "updated_at" text NOT NULL, "inventoryLevel" integer NOT NULL, "capacity" integer NOT NULL, "inventory" text, "inventoryId" integer NOT NULL, "current_location" text, "security_alert_level" integer NOT NULL, CONSTRAINT "FK_f14bf5d831e5b473ad2f2e68ab6" FOREIGN KEY ("device_type") REFERENCES "sys_cat_config_n_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_device"("id", "location", "pumpData", "dockDetails", "digitalSignature", "device_id", "name", "is_in_service", "template_id", "version", "level", "device_type", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level") SELECT "id", "location", "pumpData", "dockDetails", "digitalSignature", "device_id", "name", "is_in_service", "template_id", "version", "level", "device_type", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level" FROM "device"`,
    );
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_device" RENAME TO "device"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device" RENAME TO "temporary_device"`,
    );
    await queryRunner.query(
      `CREATE TABLE "device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" integer NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "device_type" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" text, "created_at" text NOT NULL, "updated_at" text NOT NULL, "inventoryLevel" integer NOT NULL, "capacity" integer NOT NULL, "inventory" text, "inventoryId" integer NOT NULL, "current_location" text, "security_alert_level" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "device"("id", "location", "pumpData", "dockDetails", "digitalSignature", "device_id", "name", "is_in_service", "template_id", "version", "level", "device_type", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level") SELECT "id", "location", "pumpData", "dockDetails", "digitalSignature", "device_id", "name", "is_in_service", "template_id", "version", "level", "device_type", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level" FROM "temporary_device"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_device"`);
    await queryRunner.query(
      `ALTER TABLE "device" RENAME TO "temporary_device"`,
    );
    await queryRunner.query(
      `CREATE TABLE "device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "device"("id", "location", "pumpData", "dockDetails", "digitalSignature") SELECT "id", "location", "pumpData", "dockDetails", "digitalSignature" FROM "temporary_device"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_device"`);
    await queryRunner.query(
      `ALTER TABLE "inventory" RENAME TO "temporary_inventory"`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceIdId" integer, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL, "level" integer NOT NULL, "currentLevel" float NOT NULL, CONSTRAINT "UQ_e04a8f609e3fe61e7c6d2a034d8" UNIQUE ("deviceIdId"), CONSTRAINT "FK_e14dfae414171de387d8942d6d0" FOREIGN KEY ("deviceIdId") REFERENCES "device" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "inventory"("id", "deviceIdId", "ingredientId", "currentVolume", "capacity", "level") SELECT "id", "deviceIdId", "ingredientId", "currentVolume", "capacity", "level" FROM "temporary_inventory"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_inventory"`);
    await queryRunner.query(`DROP TABLE "sys_cat_config_n_values"`);
    await queryRunner.query(`DROP TABLE "advs_mv_parts_link"`);
  }
}
