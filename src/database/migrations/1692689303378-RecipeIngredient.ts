import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecipeIngredient1692689303378 implements MigrationInterface {
  name = 'RecipeIngredient1692689303378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL, "hubId" text, "dockId" text, "dispenserId" text, "recipeId" text, "recipe" text)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe" FROM "transfer"`,
    );
    await queryRunner.query(`DROP TABLE "transfer"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_transfer" RENAME TO "transfer"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingr_mg_ingredients" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" varchar NOT NULL, "name" varchar NOT NULL, "ref_value" integer NOT NULL, "price_per_ml" integer NOT NULL, "category" integer NOT NULL, "sub_category" integer NOT NULL, "unit_of_ingredient" varchar NOT NULL, "can_be_pumped" boolean NOT NULL, "is_raw_material" boolean NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "recipeId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingr_mg_ingredients"("id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at") SELECT "id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at" FROM "ingr_mg_ingredients"`,
    );
    await queryRunner.query(`DROP TABLE "ingr_mg_ingredients"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingr_mg_ingredients" RENAME TO "ingr_mg_ingredients"`,
    );
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
    await queryRunner.query(
      `CREATE TABLE "temporary_ingr_mg_ingredients" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" varchar NOT NULL, "name" varchar NOT NULL, "ref_value" integer NOT NULL, "price_per_ml" integer NOT NULL, "category" integer NOT NULL, "sub_category" integer NOT NULL, "unit_of_ingredient" varchar NOT NULL, "can_be_pumped" boolean NOT NULL, "is_raw_material" boolean NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "recipeId" integer, CONSTRAINT "FK_d85a42bb7050ed55b9fa916c56d" FOREIGN KEY ("recipeId") REFERENCES "recipe" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingr_mg_ingredients"("id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "recipeId") SELECT "id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "recipeId" FROM "ingr_mg_ingredients"`,
    );
    await queryRunner.query(`DROP TABLE "ingr_mg_ingredients"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingr_mg_ingredients" RENAME TO "ingr_mg_ingredients"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingr_mg_ingredients" RENAME TO "temporary_ingr_mg_ingredients"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_ingredients" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" varchar NOT NULL, "name" varchar NOT NULL, "ref_value" integer NOT NULL, "price_per_ml" integer NOT NULL, "category" integer NOT NULL, "sub_category" integer NOT NULL, "unit_of_ingredient" varchar NOT NULL, "can_be_pumped" boolean NOT NULL, "is_raw_material" boolean NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "recipeId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "ingr_mg_ingredients"("id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "recipeId") SELECT "id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at", "recipeId" FROM "temporary_ingr_mg_ingredients"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingr_mg_ingredients"`);
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
    await queryRunner.query(
      `ALTER TABLE "ingr_mg_ingredients" RENAME TO "temporary_ingr_mg_ingredients"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingr_mg_ingredients" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ing_id" varchar NOT NULL, "name" varchar NOT NULL, "ref_value" integer NOT NULL, "price_per_ml" integer NOT NULL, "category" integer NOT NULL, "sub_category" integer NOT NULL, "unit_of_ingredient" varchar NOT NULL, "can_be_pumped" boolean NOT NULL, "is_raw_material" boolean NOT NULL, "created_by" integer NOT NULL, "modified_by" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`,
    );
    await queryRunner.query(
      `INSERT INTO "ingr_mg_ingredients"("id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at") SELECT "id", "ing_id", "name", "ref_value", "price_per_ml", "category", "sub_category", "unit_of_ingredient", "can_be_pumped", "is_raw_material", "created_by", "modified_by", "deleted_at", "created_at", "updated_at" FROM "temporary_ingr_mg_ingredients"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingr_mg_ingredients"`);
    await queryRunner.query(
      `ALTER TABLE "transfer" RENAME TO "temporary_transfer"`,
    );
    await queryRunner.query(
      `CREATE TABLE "transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL, "hubId" text, "dockId" text, "dispenserId" text, "recipeId" text, "recipe" text, "Transfer_id" text)`,
    );
    await queryRunner.query(
      `INSERT INTO "transfer"("id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe") SELECT "id", "sourceDeviceId", "destinationDeviceId", "ingredientId", "transferredVolume", "hubId", "dockId", "dispenserId", "recipeId", "recipe" FROM "temporary_transfer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_transfer"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
  }
}
