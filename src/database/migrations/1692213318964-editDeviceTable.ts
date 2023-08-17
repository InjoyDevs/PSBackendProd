import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditDeviceTable1692213318964 implements MigrationInterface {
  name = 'EditDeviceTable1692213318964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_aprt_mg_part_digital_id" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_type" integer NOT NULL, "part_code" varchar(255) NOT NULL, "sr_no" varchar(255) NOT NULL, "part_spec_details" varchar(255) NOT NULL, "capacity" double precision NOT NULL, "purchase_date" datetime, "service_life_hours" integer NOT NULL, "commissioning_date" datetime, "expiry_date" datetime, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_aprt_mg_part_digital_id"("id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at") SELECT "id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at" FROM "aprt_mg_part_digital_id"`,
    );
    await queryRunner.query(`DROP TABLE "aprt_mg_part_digital_id"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_aprt_mg_part_digital_id" RENAME TO "aprt_mg_part_digital_id"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_advs_mg_devices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" boolean NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "current_location" text, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "device_type" integer, CONSTRAINT "FK_528b7759be1a8d1e762411f05e2" FOREIGN KEY ("device_type") REFERENCES "sys_cat_config_n_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_advs_mg_devices"("id", "device_id", "name", "is_in_service", "template_id", "version", "level", "current_location", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type") SELECT "id", "device_id", "name", "is_in_service", "template_id", "version", "level", "current_location", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type" FROM "advs_mg_devices"`,
    );
    await queryRunner.query(`DROP TABLE "advs_mg_devices"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_advs_mg_devices" RENAME TO "advs_mg_devices"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_aprt_mg_part_digital_id" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_type" integer NOT NULL, "part_code" varchar(255) NOT NULL, "sr_no" varchar(255) NOT NULL, "part_spec_details" varchar(255), "capacity" double precision NOT NULL, "purchase_date" datetime, "service_life_hours" integer NOT NULL, "commissioning_date" datetime, "expiry_date" datetime, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_aprt_mg_part_digital_id"("id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at") SELECT "id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at" FROM "aprt_mg_part_digital_id"`,
    );
    await queryRunner.query(`DROP TABLE "aprt_mg_part_digital_id"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_aprt_mg_part_digital_id" RENAME TO "aprt_mg_part_digital_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aprt_mg_part_digital_id" RENAME TO "temporary_aprt_mg_part_digital_id"`,
    );
    await queryRunner.query(
      `CREATE TABLE "aprt_mg_part_digital_id" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_type" integer NOT NULL, "part_code" varchar(255) NOT NULL, "sr_no" varchar(255) NOT NULL, "part_spec_details" varchar(255) NOT NULL, "capacity" double precision NOT NULL, "purchase_date" datetime, "service_life_hours" integer NOT NULL, "commissioning_date" datetime, "expiry_date" datetime, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "aprt_mg_part_digital_id"("id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at") SELECT "id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at" FROM "temporary_aprt_mg_part_digital_id"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_aprt_mg_part_digital_id"`);
    await queryRunner.query(
      `ALTER TABLE "advs_mg_devices" RENAME TO "temporary_advs_mg_devices"`,
    );
    await queryRunner.query(
      `CREATE TABLE "advs_mg_devices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" boolean NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, "inventoryLevel" integer NOT NULL, "capacity" integer NOT NULL, "inventory" text, "inventoryId" integer NOT NULL, "current_location" text, "security_alert_level" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "device_type" integer, CONSTRAINT "FK_528b7759be1a8d1e762411f05e2" FOREIGN KEY ("device_type") REFERENCES "sys_cat_config_n_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "advs_mg_devices"("id", "device_id", "name", "is_in_service", "template_id", "version", "level", "current_location", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type") SELECT "id", "device_id", "name", "is_in_service", "template_id", "version", "level", "current_location", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type" FROM "temporary_advs_mg_devices"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_advs_mg_devices"`);
    await queryRunner.query(
      `ALTER TABLE "aprt_mg_part_digital_id" RENAME TO "temporary_aprt_mg_part_digital_id"`,
    );
    await queryRunner.query(
      `CREATE TABLE "aprt_mg_part_digital_id" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_type" integer NOT NULL, "part_code" varchar(255) NOT NULL, "sr_no" varchar(255) NOT NULL, "part_spec_details" varchar(255) NOT NULL, "capacity" double precision NOT NULL, "purchase_date" datetime, "service_life_hours" integer NOT NULL, "commissioning_date" datetime, "expiry_date" datetime, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "aprt_mg_part_digital_id"("id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at") SELECT "id", "part_type", "part_code", "sr_no", "part_spec_details", "capacity", "purchase_date", "service_life_hours", "commissioning_date", "expiry_date", "created_by", "modified_by", "deleted_at", "created_at", "updated_at" FROM "temporary_aprt_mg_part_digital_id"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_aprt_mg_part_digital_id"`);
  }
}
