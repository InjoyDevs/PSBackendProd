import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuickFixAndPumpAndOrder1692035961363
  implements MigrationInterface
{
  name = 'QuickFixAndPumpAndOrder1692035961363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "device_current_location" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "current_location" text NOT NULL, "security_alert_level" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime)`,
    );
    await queryRunner.query(
      `CREATE TABLE "sys_cat_config_n_values" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "type" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "advs_mv_parts_link" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" varchar NOT NULL, "part_id" varchar NOT NULL, "induction_date" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "created_by" varchar NOT NULL, "modified_by" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "advs_mg_devices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" boolean NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, "inventoryLevel" integer NOT NULL, "capacity" integer NOT NULL, "inventory" text, "inventoryId" integer NOT NULL, "current_location" text, "security_alert_level" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "device_type" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "aprt_mg_part_digital_id" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_type" integer NOT NULL, "part_code" varchar(255) NOT NULL, "sr_no" varchar(255) NOT NULL, "part_spec_details" varchar(255) NOT NULL, "capacity" double precision NOT NULL, "purchase_date" datetime, "service_life_hours" integer NOT NULL, "commissioning_date" datetime, "expiry_date" datetime, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_ingredients" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" varchar NOT NULL, "name" varchar NOT NULL, "ref_value" integer NOT NULL, "price_per_ml" integer NOT NULL, "category" integer NOT NULL, "sub_category" integer NOT NULL, "unit_of_ingredient" varchar NOT NULL, "can_be_pumped" boolean NOT NULL, "is_raw_material" boolean NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "advs_mt_ingr_tank_linking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "ing_id" integer NOT NULL, "tank_id" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart_mg_cancup_size_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cancup_size" varchar NOT NULL, "cancup_vol_ml" integer NOT NULL, "description" text NOT NULL, "cost" integer NOT NULL, "price" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, "created_by" integer NOT NULL, "modified_by" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_can_cup_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "catalogue_id" integer NOT NULL, "recipe_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, "cancup_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "range_level_cancup" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "range_id" integer NOT NULL, "product_type" integer NOT NULL, "product_category" integer NOT NULL, "service_type" integer NOT NULL, "is_inherited" boolean NOT NULL, "is_active" boolean NOT NULL, "cancup_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "range_service_type_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "range_id" integer NOT NULL, "product_type" integer NOT NULL, "product_category" integer NOT NULL, "service_type" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_recipe_catalogue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe" varchar NOT NULL, "recipe_code" varchar NOT NULL, "recipe_name" varchar NOT NULL, "product_type" integer NOT NULL, "product_category" integer NOT NULL, "recipe_type" integer NOT NULL, "published" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "volume" integer NOT NULL, "price" integer NOT NULL, "min_price" integer NOT NULL, "max_price" integer NOT NULL, "base_price" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "created_by" integer NOT NULL, "modified_by" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_mixing_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dry_volume" integer NOT NULL, "liquid_volume" integer NOT NULL, "produced_ingredient_volume" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime)`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_recipe_details" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "is_included" boolean NOT NULL, "value" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mv_ingredient_tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" integer NOT NULL, "ing_tag" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mv_oi_dock_pump_linking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "temp_nozzle_pump_id" integer NOT NULL, "dock_point_id" integer NOT NULL, "tank_ing_mapping_id" integer NOT NULL, "pump_id" integer NOT NULL, "pump_index" integer NOT NULL, "nozzle_index" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_td_ingredient_batch" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "batch_id" varchar NOT NULL, "ingredient_id" integer NOT NULL, "batch_type" varchar NOT NULL, "qty" integer NOT NULL, "expiry_date" varchar NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_td_dvs_ingr_batch_vol_stat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "current_batch_id" integer NOT NULL, "current_volume" integer NOT NULL, "available_for_booking" integer NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL, "deviceIdId" integer, CONSTRAINT "REL_e14dfae414171de387d8942d6d" UNIQUE ("deviceIdId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_td_transact_transfer_detail" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "transfer_id" varchar NOT NULL, "ingredient_id" integer NOT NULL, "volume" integer NOT NULL, "batch_id" varchar NOT NULL, "status" varchar NOT NULL, "start_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "end_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_td_transact_transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "transaction_id" bigint NOT NULL, "transfer_id" varchar(255) NOT NULL, "device_id" integer NOT NULL, "mode" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_tv_transact_q_executed_link" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "transactionQ_id" integer NOT NULL, "realized_transaction_id" integer NOT NULL, "status" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime)`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_on_demand" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe_id" integer NOT NULL, "cancup_id" integer NOT NULL, "qty" decimal NOT NULL, "unit_range_price" decimal NOT NULL, "total" decimal NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razorpay_order_id" varchar NOT NULL, "razorpay_payment_id" varchar NOT NULL, "user_id" integer NOT NULL, "device_id" integer NOT NULL, "type_of_service" integer NOT NULL, "range_id" integer NOT NULL, "cart_total" decimal NOT NULL, "tax_in_percentage" decimal NOT NULL, "tax_in_amount" decimal NOT NULL, "total_payable_amount" decimal NOT NULL, "delivery_charges" decimal NOT NULL, "discount_price" decimal NOT NULL, "order_status" varchar NOT NULL, "payment_status" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subscription_name" varchar NOT NULL, "from_date" datetime NOT NULL, "to_date" datetime NOT NULL, "user_id" integer NOT NULL, "item_volume" decimal NOT NULL, "cart_total" decimal NOT NULL, "order_price" decimal NOT NULL, "delivery_charges" decimal NOT NULL, "no_of_deliveries" integer NOT NULL, "per_delivery_charge" decimal NOT NULL, "is_pos" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "aprt_mv_pump_drive_properties" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_code" integer NOT NULL, "voltage" integer NOT NULL, "pwm_speed" integer NOT NULL, "rotate_or_pulse" varchar(255) NOT NULL, "volume_ml" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "aprt_mv_pump_properties" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_code" integer NOT NULL, "pump_type" integer NOT NULL, "pipe_length_mm" double NOT NULL, "pipe_dia" double NOT NULL, "volume_ml" double NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pump" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceId" integer NOT NULL, "calibrationData" json NOT NULL, "pumpingInstructions" json NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar, "password" varchar, "socialId" varchar, "firstName" varchar, "lastName" varchar, "hash" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "userId" integer)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "advs_mv_io_dock_parts_link" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dock_point_id" integer NOT NULL, "part_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime)`,
    );
    await queryRunner.query(
      `CREATE TABLE "dock_point_nozzle_tank_ing_mapping" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "temp_nozzle_tank_ingr_id" integer NOT NULL, "dock_point_id" integer NOT NULL, "nozzle_index" integer NOT NULL, "tank_ing_mapping_id" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "aprt_mv_part_digital_signature" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sign_id" varchar(255) NOT NULL, "part_id" integer NOT NULL, "digital_sign" text NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "aprt_mv_part_digital_id" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "part_id" integer NOT NULL, "id_type" integer NOT NULL, "id_value" varchar(255) NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_advs_mg_devices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" boolean NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, "inventoryLevel" integer NOT NULL, "capacity" integer NOT NULL, "inventory" text, "inventoryId" integer NOT NULL, "current_location" text, "security_alert_level" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "device_type" integer, CONSTRAINT "FK_528b7759be1a8d1e762411f05e2" FOREIGN KEY ("device_type") REFERENCES "sys_cat_config_n_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_advs_mg_devices"("id", "device_id", "name", "is_in_service", "template_id", "version", "level", "location", "pumpData", "dockDetails", "digitalSignature", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type") SELECT "id", "device_id", "name", "is_in_service", "template_id", "version", "level", "location", "pumpData", "dockDetails", "digitalSignature", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type" FROM "advs_mg_devices"`,
    );
    await queryRunner.query(`DROP TABLE "advs_mg_devices"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_advs_mg_devices" RENAME TO "advs_mg_devices"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_advs_mt_ingr_tank_linking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "ing_id" integer NOT NULL, "tank_id" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_120f3d7c3b29c91bd48fd80e10d" FOREIGN KEY ("tank_id") REFERENCES "aprt_mg_part_digital_id" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8b7fff13c1684e449903d2d358c" FOREIGN KEY ("ing_id") REFERENCES "ingr_mg_ingredients" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_advs_mt_ingr_tank_linking"("id", "device_id", "ing_id", "tank_id", "deleted_at", "created_at", "updated_at") SELECT "id", "device_id", "ing_id", "tank_id", "deleted_at", "created_at", "updated_at" FROM "advs_mt_ingr_tank_linking"`,
    );
    await queryRunner.query(`DROP TABLE "advs_mt_ingr_tank_linking"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_advs_mt_ingr_tank_linking" RENAME TO "advs_mt_ingr_tank_linking"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_recipe_can_cup_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "catalogue_id" integer NOT NULL, "recipe_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, "cancup_id" integer, CONSTRAINT "FK_a621738cb9f528b471cd8645215" FOREIGN KEY ("cancup_id") REFERENCES "cart_mg_cancup_size_config" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipe_can_cup_config"("id", "catalogue_id", "recipe_id", "created_at", "updated_at", "deleted_at", "cancup_id") SELECT "id", "catalogue_id", "recipe_id", "created_at", "updated_at", "deleted_at", "cancup_id" FROM "recipe_can_cup_config"`,
    );
    await queryRunner.query(`DROP TABLE "recipe_can_cup_config"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipe_can_cup_config" RENAME TO "recipe_can_cup_config"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_range_level_cancup" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "range_id" integer NOT NULL, "product_type" integer NOT NULL, "product_category" integer NOT NULL, "service_type" integer NOT NULL, "is_inherited" boolean NOT NULL, "is_active" boolean NOT NULL, "cancup_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_8241c4572c7f30a2ca502457173" FOREIGN KEY ("cancup_id") REFERENCES "cart_mg_cancup_size_config" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_range_level_cancup"("id", "range_id", "product_type", "product_category", "service_type", "is_inherited", "is_active", "cancup_id", "created_at", "updated_at") SELECT "id", "range_id", "product_type", "product_category", "service_type", "is_inherited", "is_active", "cancup_id", "created_at", "updated_at" FROM "range_level_cancup"`,
    );
    await queryRunner.query(`DROP TABLE "range_level_cancup"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_range_level_cancup" RENAME TO "range_level_cancup"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingr_mg_recipe_catalogue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe" varchar NOT NULL, "recipe_code" varchar NOT NULL, "recipe_name" varchar NOT NULL, "product_type" integer NOT NULL, "product_category" integer NOT NULL, "recipe_type" integer NOT NULL, "published" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "volume" integer NOT NULL, "price" integer NOT NULL, "min_price" integer NOT NULL, "max_price" integer NOT NULL, "base_price" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "created_by" integer NOT NULL, "modified_by" integer NOT NULL, CONSTRAINT "FK_81a0107f30b6a3fbab75d726b15" FOREIGN KEY ("recipe_type") REFERENCES "sys_cat_config_n_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a601ae45c64b8e879876687809e" FOREIGN KEY ("product_type") REFERENCES "range_service_type_config" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingr_mg_recipe_catalogue"("id", "recipe", "recipe_code", "recipe_name", "product_type", "product_category", "recipe_type", "published", "volume", "price", "min_price", "max_price", "base_price", "deleted_at", "created_at", "updated_at", "created_by", "modified_by") SELECT "id", "recipe", "recipe_code", "recipe_name", "product_type", "product_category", "recipe_type", "published", "volume", "price", "min_price", "max_price", "base_price", "deleted_at", "created_at", "updated_at", "created_by", "modified_by" FROM "ingr_mg_recipe_catalogue"`,
    );
    await queryRunner.query(`DROP TABLE "ingr_mg_recipe_catalogue"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingr_mg_recipe_catalogue" RENAME TO "ingr_mg_recipe_catalogue"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingr_mg_recipe_details" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "is_included" boolean NOT NULL, "value" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_aa153c101c6cc49c6f5b78c9022" FOREIGN KEY ("recipe_id") REFERENCES "ingr_mg_recipe_catalogue" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4c783a17c1cfcd716938cf8e7af" FOREIGN KEY ("ingredient_id") REFERENCES "ingr_mg_ingredients" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingr_mg_recipe_details"("id", "recipe_id", "ingredient_id", "is_included", "value", "deleted_at", "created_at", "updated_at") SELECT "id", "recipe_id", "ingredient_id", "is_included", "value", "deleted_at", "created_at", "updated_at" FROM "ingr_mg_recipe_details"`,
    );
    await queryRunner.query(`DROP TABLE "ingr_mg_recipe_details"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingr_mg_recipe_details" RENAME TO "ingr_mg_recipe_details"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingr_mv_ingredient_tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" integer NOT NULL, "ing_tag" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_7b88359cc9f1a085beed479fc97" FOREIGN KEY ("ing_id") REFERENCES "ingr_mg_ingredients" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_20929a7fbd71e22cc47d3816c6b" FOREIGN KEY ("ing_tag") REFERENCES "sys_cat_config_n_values" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingr_mv_ingredient_tags"("id", "ing_id", "ing_tag", "deleted_at", "created_at", "updated_at") SELECT "id", "ing_id", "ing_tag", "deleted_at", "created_at", "updated_at" FROM "ingr_mv_ingredient_tags"`,
    );
    await queryRunner.query(`DROP TABLE "ingr_mv_ingredient_tags"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingr_mv_ingredient_tags" RENAME TO "ingr_mv_ingredient_tags"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingr_mv_oi_dock_pump_linking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "temp_nozzle_pump_id" integer NOT NULL, "dock_point_id" integer NOT NULL, "tank_ing_mapping_id" integer NOT NULL, "pump_id" integer NOT NULL, "pump_index" integer NOT NULL, "nozzle_index" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_3e426444bfd166fc1f4f9b5fbd7" FOREIGN KEY ("tank_ing_mapping_id") REFERENCES "advs_mt_ingr_tank_linking" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingr_mv_oi_dock_pump_linking"("id", "temp_nozzle_pump_id", "dock_point_id", "tank_ing_mapping_id", "pump_id", "pump_index", "nozzle_index", "deleted_at", "created_at", "updated_at") SELECT "id", "temp_nozzle_pump_id", "dock_point_id", "tank_ing_mapping_id", "pump_id", "pump_index", "nozzle_index", "deleted_at", "created_at", "updated_at" FROM "ingr_mv_oi_dock_pump_linking"`,
    );
    await queryRunner.query(`DROP TABLE "ingr_mv_oi_dock_pump_linking"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingr_mv_oi_dock_pump_linking" RENAME TO "ingr_mv_oi_dock_pump_linking"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_invt_td_dvs_ingr_batch_vol_stat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "current_batch_id" integer NOT NULL, "current_volume" integer NOT NULL, "available_for_booking" integer NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, CONSTRAINT "FK_1f17db613a091617a55678da2b0" FOREIGN KEY ("ingredient_id") REFERENCES "ingr_mg_ingredients" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3586adb4f5a95f2eba760b7eaa8" FOREIGN KEY ("current_batch_id") REFERENCES "invt_td_ingredient_batch" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_invt_td_dvs_ingr_batch_vol_stat"("id", "device_id", "ingredient_id", "current_batch_id", "current_volume", "available_for_booking", "created_at", "updated_at") SELECT "id", "device_id", "ingredient_id", "current_batch_id", "current_volume", "available_for_booking", "created_at", "updated_at" FROM "invt_td_dvs_ingr_batch_vol_stat"`,
    );
    await queryRunner.query(`DROP TABLE "invt_td_dvs_ingr_batch_vol_stat"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_invt_td_dvs_ingr_batch_vol_stat" RENAME TO "invt_td_dvs_ingr_batch_vol_stat"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL, "deviceIdId" integer, CONSTRAINT "REL_e14dfae414171de387d8942d6d" UNIQUE ("deviceIdId"), CONSTRAINT "FK_e14dfae414171de387d8942d6d0" FOREIGN KEY ("deviceIdId") REFERENCES "advs_mg_devices" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_inventory"("id", "level", "ingredientId", "currentVolume", "capacity", "deviceIdId") SELECT "id", "level", "ingredientId", "currentVolume", "capacity", "deviceIdId" FROM "inventory"`,
    );
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_inventory" RENAME TO "inventory"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_invt_td_transact_transfer_detail" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "transfer_id" varchar NOT NULL, "ingredient_id" integer NOT NULL, "volume" integer NOT NULL, "batch_id" varchar NOT NULL, "status" varchar NOT NULL, "start_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "end_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_bd9879ac05d93ef98962e8b8775" FOREIGN KEY ("ingredient_id") REFERENCES "ingr_mg_ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_invt_td_transact_transfer_detail"("id", "transfer_id", "ingredient_id", "volume", "batch_id", "status", "start_time", "end_time", "deleted_at", "created_at", "updated_at") SELECT "id", "transfer_id", "ingredient_id", "volume", "batch_id", "status", "start_time", "end_time", "deleted_at", "created_at", "updated_at" FROM "invt_td_transact_transfer_detail"`,
    );
    await queryRunner.query(`DROP TABLE "invt_td_transact_transfer_detail"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_invt_td_transact_transfer_detail" RENAME TO "invt_td_transact_transfer_detail"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_invt_td_transact_transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "transaction_id" bigint NOT NULL, "transfer_id" varchar(255) NOT NULL, "device_id" integer NOT NULL, "mode" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_45186503f7f2d7a8eb8039c3bd7" FOREIGN KEY ("device_id") REFERENCES "advs_mg_devices" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_invt_td_transact_transfer"("id", "transaction_id", "transfer_id", "device_id", "mode", "created_at", "updated_at") SELECT "id", "transaction_id", "transfer_id", "device_id", "mode", "created_at", "updated_at" FROM "invt_td_transact_transfer"`,
    );
    await queryRunner.query(`DROP TABLE "invt_td_transact_transfer"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_invt_td_transact_transfer" RENAME TO "invt_td_transact_transfer"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_on_demand" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe_id" integer NOT NULL, "cancup_id" integer NOT NULL, "qty" decimal NOT NULL, "unit_range_price" decimal NOT NULL, "total" decimal NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer, CONSTRAINT "FK_b533aec312098af74dcc224edca" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_on_demand"("id", "recipe_id", "cancup_id", "qty", "unit_range_price", "total", "created_at", "updated_at", "orderId") SELECT "id", "recipe_id", "cancup_id", "qty", "unit_range_price", "total", "created_at", "updated_at", "orderId" FROM "order_on_demand"`,
    );
    await queryRunner.query(`DROP TABLE "order_on_demand"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_order_on_demand" RENAME TO "order_on_demand"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subscription_name" varchar NOT NULL, "from_date" datetime NOT NULL, "to_date" datetime NOT NULL, "user_id" integer NOT NULL, "item_volume" decimal NOT NULL, "cart_total" decimal NOT NULL, "order_price" decimal NOT NULL, "delivery_charges" decimal NOT NULL, "no_of_deliveries" integer NOT NULL, "per_delivery_charge" decimal NOT NULL, "is_pos" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer, CONSTRAINT "FK_d158a26fca0f02ce4dccc8682ae" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_subscription"("id", "subscription_name", "from_date", "to_date", "user_id", "item_volume", "cart_total", "order_price", "delivery_charges", "no_of_deliveries", "per_delivery_charge", "is_pos", "created_at", "updated_at", "orderId") SELECT "id", "subscription_name", "from_date", "to_date", "user_id", "item_volume", "cart_total", "order_price", "delivery_charges", "no_of_deliveries", "per_delivery_charge", "is_pos", "created_at", "updated_at", "orderId" FROM "order_subscription"`,
    );
    await queryRunner.query(`DROP TABLE "order_subscription"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_order_subscription" RENAME TO "order_subscription"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f"`);
    await queryRunner.query(`DROP INDEX "IDX_58e4dbff0e1a32a9bdc861bb29"`);
    await queryRunner.query(`DROP INDEX "IDX_f0e1b4ecdca13b177e2e3a0613"`);
    await queryRunner.query(`DROP INDEX "IDX_e282acb94d2e3aec10f480e4f6"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar, "password" varchar, "socialId" varchar, "firstName" varchar, "lastName" varchar, "hash" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "password", "socialId", "firstName", "lastName", "hash", "createdAt", "updatedAt", "deletedAt", "roleId", "statusId") SELECT "id", "email", "password", "socialId", "firstName", "lastName", "hash", "createdAt", "updatedAt", "deletedAt", "roleId", "statusId" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_3d2f174ef04fb312fdebd0ddc5"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "userId" integer, CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_session"("id", "createdAt", "deletedAt", "userId") SELECT "id", "createdAt", "deletedAt", "userId" FROM "session"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_session" RENAME TO "session"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_dock_point_nozzle_tank_ing_mapping" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "temp_nozzle_tank_ingr_id" integer NOT NULL, "dock_point_id" integer NOT NULL, "nozzle_index" integer NOT NULL, "tank_ing_mapping_id" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "FK_f5c4f2ba135d06c7742736bff65" FOREIGN KEY ("tank_ing_mapping_id") REFERENCES "advs_mt_ingr_tank_linking" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_dock_point_nozzle_tank_ing_mapping"("id", "temp_nozzle_tank_ingr_id", "dock_point_id", "nozzle_index", "tank_ing_mapping_id", "deleted_at", "created_at", "updated_at") SELECT "id", "temp_nozzle_tank_ingr_id", "dock_point_id", "nozzle_index", "tank_ing_mapping_id", "deleted_at", "created_at", "updated_at" FROM "dock_point_nozzle_tank_ing_mapping"`,
    );
    await queryRunner.query(`DROP TABLE "dock_point_nozzle_tank_ing_mapping"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_dock_point_nozzle_tank_ing_mapping" RENAME TO "dock_point_nozzle_tank_ing_mapping"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dock_point_nozzle_tank_ing_mapping" RENAME TO "temporary_dock_point_nozzle_tank_ing_mapping"`,
    );
    await queryRunner.query(
      `CREATE TABLE "dock_point_nozzle_tank_ing_mapping" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "temp_nozzle_tank_ingr_id" integer NOT NULL, "dock_point_id" integer NOT NULL, "nozzle_index" integer NOT NULL, "tank_ing_mapping_id" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "dock_point_nozzle_tank_ing_mapping"("id", "temp_nozzle_tank_ingr_id", "dock_point_id", "nozzle_index", "tank_ing_mapping_id", "deleted_at", "created_at", "updated_at") SELECT "id", "temp_nozzle_tank_ingr_id", "dock_point_id", "nozzle_index", "tank_ing_mapping_id", "deleted_at", "created_at", "updated_at" FROM "temporary_dock_point_nozzle_tank_ing_mapping"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_dock_point_nozzle_tank_ing_mapping"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_3d2f174ef04fb312fdebd0ddc5"`);
    await queryRunner.query(
      `ALTER TABLE "session" RENAME TO "temporary_session"`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "session"("id", "createdAt", "deletedAt", "userId") SELECT "id", "createdAt", "deletedAt", "userId" FROM "temporary_session"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_session"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_e282acb94d2e3aec10f480e4f6"`);
    await queryRunner.query(`DROP INDEX "IDX_f0e1b4ecdca13b177e2e3a0613"`);
    await queryRunner.query(`DROP INDEX "IDX_58e4dbff0e1a32a9bdc861bb29"`);
    await queryRunner.query(`DROP INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar, "password" varchar, "socialId" varchar, "firstName" varchar, "lastName" varchar, "hash" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "password", "socialId", "firstName", "lastName", "hash", "createdAt", "updatedAt", "deletedAt", "roleId", "statusId") SELECT "id", "email", "password", "socialId", "firstName", "lastName", "hash", "createdAt", "updatedAt", "deletedAt", "roleId", "statusId" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order_subscription" RENAME TO "temporary_order_subscription"`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_subscription" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subscription_name" varchar NOT NULL, "from_date" datetime NOT NULL, "to_date" datetime NOT NULL, "user_id" integer NOT NULL, "item_volume" decimal NOT NULL, "cart_total" decimal NOT NULL, "order_price" decimal NOT NULL, "delivery_charges" decimal NOT NULL, "no_of_deliveries" integer NOT NULL, "per_delivery_charge" decimal NOT NULL, "is_pos" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "order_subscription"("id", "subscription_name", "from_date", "to_date", "user_id", "item_volume", "cart_total", "order_price", "delivery_charges", "no_of_deliveries", "per_delivery_charge", "is_pos", "created_at", "updated_at", "orderId") SELECT "id", "subscription_name", "from_date", "to_date", "user_id", "item_volume", "cart_total", "order_price", "delivery_charges", "no_of_deliveries", "per_delivery_charge", "is_pos", "created_at", "updated_at", "orderId" FROM "temporary_order_subscription"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_order_subscription"`);
    await queryRunner.query(
      `ALTER TABLE "order_on_demand" RENAME TO "temporary_order_on_demand"`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_on_demand" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe_id" integer NOT NULL, "cancup_id" integer NOT NULL, "qty" decimal NOT NULL, "unit_range_price" decimal NOT NULL, "total" decimal NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "order_on_demand"("id", "recipe_id", "cancup_id", "qty", "unit_range_price", "total", "created_at", "updated_at", "orderId") SELECT "id", "recipe_id", "cancup_id", "qty", "unit_range_price", "total", "created_at", "updated_at", "orderId" FROM "temporary_order_on_demand"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_order_on_demand"`);
    await queryRunner.query(
      `ALTER TABLE "invt_td_transact_transfer" RENAME TO "temporary_invt_td_transact_transfer"`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_td_transact_transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "transaction_id" bigint NOT NULL, "transfer_id" varchar(255) NOT NULL, "device_id" integer NOT NULL, "mode" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "invt_td_transact_transfer"("id", "transaction_id", "transfer_id", "device_id", "mode", "created_at", "updated_at") SELECT "id", "transaction_id", "transfer_id", "device_id", "mode", "created_at", "updated_at" FROM "temporary_invt_td_transact_transfer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_invt_td_transact_transfer"`);
    await queryRunner.query(
      `ALTER TABLE "invt_td_transact_transfer_detail" RENAME TO "temporary_invt_td_transact_transfer_detail"`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_td_transact_transfer_detail" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "transfer_id" varchar NOT NULL, "ingredient_id" integer NOT NULL, "volume" integer NOT NULL, "batch_id" varchar NOT NULL, "status" varchar NOT NULL, "start_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "end_time" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "invt_td_transact_transfer_detail"("id", "transfer_id", "ingredient_id", "volume", "batch_id", "status", "start_time", "end_time", "deleted_at", "created_at", "updated_at") SELECT "id", "transfer_id", "ingredient_id", "volume", "batch_id", "status", "start_time", "end_time", "deleted_at", "created_at", "updated_at" FROM "temporary_invt_td_transact_transfer_detail"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_invt_td_transact_transfer_detail"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" RENAME TO "temporary_inventory"`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL, "deviceIdId" integer, CONSTRAINT "REL_e14dfae414171de387d8942d6d" UNIQUE ("deviceIdId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "inventory"("id", "level", "ingredientId", "currentVolume", "capacity", "deviceIdId") SELECT "id", "level", "ingredientId", "currentVolume", "capacity", "deviceIdId" FROM "temporary_inventory"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_inventory"`);
    await queryRunner.query(
      `ALTER TABLE "invt_td_dvs_ingr_batch_vol_stat" RENAME TO "temporary_invt_td_dvs_ingr_batch_vol_stat"`,
    );
    await queryRunner.query(
      `CREATE TABLE "invt_td_dvs_ingr_batch_vol_stat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "current_batch_id" integer NOT NULL, "current_volume" integer NOT NULL, "available_for_booking" integer NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "invt_td_dvs_ingr_batch_vol_stat"("id", "device_id", "ingredient_id", "current_batch_id", "current_volume", "available_for_booking", "created_at", "updated_at") SELECT "id", "device_id", "ingredient_id", "current_batch_id", "current_volume", "available_for_booking", "created_at", "updated_at" FROM "temporary_invt_td_dvs_ingr_batch_vol_stat"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_invt_td_dvs_ingr_batch_vol_stat"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ingr_mv_oi_dock_pump_linking" RENAME TO "temporary_ingr_mv_oi_dock_pump_linking"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mv_oi_dock_pump_linking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "temp_nozzle_pump_id" integer NOT NULL, "dock_point_id" integer NOT NULL, "tank_ing_mapping_id" integer NOT NULL, "pump_id" integer NOT NULL, "pump_index" integer NOT NULL, "nozzle_index" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "ingr_mv_oi_dock_pump_linking"("id", "temp_nozzle_pump_id", "dock_point_id", "tank_ing_mapping_id", "pump_id", "pump_index", "nozzle_index", "deleted_at", "created_at", "updated_at") SELECT "id", "temp_nozzle_pump_id", "dock_point_id", "tank_ing_mapping_id", "pump_id", "pump_index", "nozzle_index", "deleted_at", "created_at", "updated_at" FROM "temporary_ingr_mv_oi_dock_pump_linking"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_ingr_mv_oi_dock_pump_linking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ingr_mv_ingredient_tags" RENAME TO "temporary_ingr_mv_ingredient_tags"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mv_ingredient_tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" integer NOT NULL, "ing_tag" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "ingr_mv_ingredient_tags"("id", "ing_id", "ing_tag", "deleted_at", "created_at", "updated_at") SELECT "id", "ing_id", "ing_tag", "deleted_at", "created_at", "updated_at" FROM "temporary_ingr_mv_ingredient_tags"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingr_mv_ingredient_tags"`);
    await queryRunner.query(
      `ALTER TABLE "ingr_mg_recipe_details" RENAME TO "temporary_ingr_mg_recipe_details"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_recipe_details" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe_id" integer NOT NULL, "ingredient_id" integer NOT NULL, "is_included" boolean NOT NULL, "value" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "ingr_mg_recipe_details"("id", "recipe_id", "ingredient_id", "is_included", "value", "deleted_at", "created_at", "updated_at") SELECT "id", "recipe_id", "ingredient_id", "is_included", "value", "deleted_at", "created_at", "updated_at" FROM "temporary_ingr_mg_recipe_details"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingr_mg_recipe_details"`);
    await queryRunner.query(
      `ALTER TABLE "ingr_mg_recipe_catalogue" RENAME TO "temporary_ingr_mg_recipe_catalogue"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_recipe_catalogue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "recipe" varchar NOT NULL, "recipe_code" varchar NOT NULL, "recipe_name" varchar NOT NULL, "product_type" integer NOT NULL, "product_category" integer NOT NULL, "recipe_type" integer NOT NULL, "published" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "volume" integer NOT NULL, "price" integer NOT NULL, "min_price" integer NOT NULL, "max_price" integer NOT NULL, "base_price" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "created_by" integer NOT NULL, "modified_by" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "ingr_mg_recipe_catalogue"("id", "recipe", "recipe_code", "recipe_name", "product_type", "product_category", "recipe_type", "published", "volume", "price", "min_price", "max_price", "base_price", "deleted_at", "created_at", "updated_at", "created_by", "modified_by") SELECT "id", "recipe", "recipe_code", "recipe_name", "product_type", "product_category", "recipe_type", "published", "volume", "price", "min_price", "max_price", "base_price", "deleted_at", "created_at", "updated_at", "created_by", "modified_by" FROM "temporary_ingr_mg_recipe_catalogue"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingr_mg_recipe_catalogue"`);
    await queryRunner.query(
      `ALTER TABLE "range_level_cancup" RENAME TO "temporary_range_level_cancup"`,
    );
    await queryRunner.query(
      `CREATE TABLE "range_level_cancup" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "range_id" integer NOT NULL, "product_type" integer NOT NULL, "product_category" integer NOT NULL, "service_type" integer NOT NULL, "is_inherited" boolean NOT NULL, "is_active" boolean NOT NULL, "cancup_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "range_level_cancup"("id", "range_id", "product_type", "product_category", "service_type", "is_inherited", "is_active", "cancup_id", "created_at", "updated_at") SELECT "id", "range_id", "product_type", "product_category", "service_type", "is_inherited", "is_active", "cancup_id", "created_at", "updated_at" FROM "temporary_range_level_cancup"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_range_level_cancup"`);
    await queryRunner.query(
      `ALTER TABLE "recipe_can_cup_config" RENAME TO "temporary_recipe_can_cup_config"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_can_cup_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "catalogue_id" integer NOT NULL, "recipe_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, "cancup_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipe_can_cup_config"("id", "catalogue_id", "recipe_id", "created_at", "updated_at", "deleted_at", "cancup_id") SELECT "id", "catalogue_id", "recipe_id", "created_at", "updated_at", "deleted_at", "cancup_id" FROM "temporary_recipe_can_cup_config"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipe_can_cup_config"`);
    await queryRunner.query(
      `ALTER TABLE "advs_mt_ingr_tank_linking" RENAME TO "temporary_advs_mt_ingr_tank_linking"`,
    );
    await queryRunner.query(
      `CREATE TABLE "advs_mt_ingr_tank_linking" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "ing_id" integer NOT NULL, "tank_id" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "advs_mt_ingr_tank_linking"("id", "device_id", "ing_id", "tank_id", "deleted_at", "created_at", "updated_at") SELECT "id", "device_id", "ing_id", "tank_id", "deleted_at", "created_at", "updated_at" FROM "temporary_advs_mt_ingr_tank_linking"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_advs_mt_ingr_tank_linking"`);
    await queryRunner.query(
      `ALTER TABLE "advs_mg_devices" RENAME TO "temporary_advs_mg_devices"`,
    );
    await queryRunner.query(
      `CREATE TABLE "advs_mg_devices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" text NOT NULL, "name" text NOT NULL, "is_in_service" boolean NOT NULL, "template_id" bigint NOT NULL, "version" integer NOT NULL, "level" integer NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, "inventoryLevel" integer NOT NULL, "capacity" integer NOT NULL, "inventory" text, "inventoryId" integer NOT NULL, "current_location" text, "security_alert_level" integer NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "device_type" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "advs_mg_devices"("id", "device_id", "name", "is_in_service", "template_id", "version", "level", "location", "pumpData", "dockDetails", "digitalSignature", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type") SELECT "id", "device_id", "name", "is_in_service", "template_id", "version", "level", "location", "pumpData", "dockDetails", "digitalSignature", "inventoryLevel", "capacity", "inventory", "inventoryId", "current_location", "security_alert_level", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "device_type" FROM "temporary_advs_mg_devices"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_advs_mg_devices"`);
    await queryRunner.query(`DROP TABLE "aprt_mv_part_digital_id"`);
    await queryRunner.query(`DROP TABLE "aprt_mv_part_digital_signature"`);
    await queryRunner.query(`DROP TABLE "dock_point_nozzle_tank_ing_mapping"`);
    await queryRunner.query(`DROP TABLE "advs_mv_io_dock_parts_link"`);
    await queryRunner.query(`DROP TABLE "transfer"`);
    await queryRunner.query(`DROP INDEX "IDX_3d2f174ef04fb312fdebd0ddc5"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP INDEX "IDX_e282acb94d2e3aec10f480e4f6"`);
    await queryRunner.query(`DROP INDEX "IDX_f0e1b4ecdca13b177e2e3a0613"`);
    await queryRunner.query(`DROP INDEX "IDX_58e4dbff0e1a32a9bdc861bb29"`);
    await queryRunner.query(`DROP INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "pump"`);
    await queryRunner.query(`DROP TABLE "aprt_mv_pump_properties"`);
    await queryRunner.query(`DROP TABLE "aprt_mv_pump_drive_properties"`);
    await queryRunner.query(`DROP TABLE "order_subscription"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order_on_demand"`);
    await queryRunner.query(`DROP TABLE "invt_tv_transact_q_executed_link"`);
    await queryRunner.query(`DROP TABLE "invt_td_transact_transfer"`);
    await queryRunner.query(`DROP TABLE "invt_td_transact_transfer_detail"`);
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(`DROP TABLE "invt_td_dvs_ingr_batch_vol_stat"`);
    await queryRunner.query(`DROP TABLE "invt_td_ingredient_batch"`);
    await queryRunner.query(`DROP TABLE "ingr_mv_oi_dock_pump_linking"`);
    await queryRunner.query(`DROP TABLE "ingr_mv_ingredient_tags"`);
    await queryRunner.query(`DROP TABLE "ingr_mg_recipe_details"`);
    await queryRunner.query(`DROP TABLE "ingr_mg_mixing_config"`);
    await queryRunner.query(`DROP TABLE "ingr_mg_recipe_catalogue"`);
    await queryRunner.query(`DROP TABLE "range_service_type_config"`);
    await queryRunner.query(`DROP TABLE "range_level_cancup"`);
    await queryRunner.query(`DROP TABLE "recipe_can_cup_config"`);
    await queryRunner.query(`DROP TABLE "cart_mg_cancup_size_config"`);
    await queryRunner.query(`DROP TABLE "advs_mt_ingr_tank_linking"`);
    await queryRunner.query(`DROP TABLE "ingr_mg_ingredients"`);
    await queryRunner.query(`DROP TABLE "aprt_mg_part_digital_id"`);
    await queryRunner.query(`DROP TABLE "advs_mg_devices"`);
    await queryRunner.query(`DROP TABLE "advs_mv_parts_link"`);
    await queryRunner.query(`DROP TABLE "sys_cat_config_n_values"`);
    await queryRunner.query(`DROP TABLE "device_current_location"`);
  }
}
