import { MigrationInterface, QueryRunner } from 'typeorm';

export class IngridentRecipes1690798113845 implements MigrationInterface {
  name = 'IngridentRecipes1690798113845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipe"("id", "name") SELECT "id", "name" FROM "recipe"`,
    );
    await queryRunner.query(`DROP TABLE "recipe"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipe" RENAME TO "recipe"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingredient"("id", "name") SELECT "id", "name" FROM "ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingredient" RENAME TO "ingredient"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" varchar NOT NULL, "preparation_time" integer NOT NULL, "cooking_time" integer NOT NULL, "servings" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipe"("id", "name") SELECT "id", "name" FROM "recipe"`,
    );
    await queryRunner.query(`DROP TABLE "recipe"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipe" RENAME TO "recipe"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "quantity" integer NOT NULL, "recipe_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingredient"("id", "name") SELECT "id", "name" FROM "ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingredient" RENAME TO "ingredient"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "preparation_time" integer NOT NULL, "cooking_time" integer NOT NULL, "servings" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_recipe"("id", "name", "description", "preparation_time", "cooking_time", "servings") SELECT "id", "name", "description", "preparation_time", "cooking_time", "servings" FROM "recipe"`,
    );
    await queryRunner.query(`DROP TABLE "recipe"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_recipe" RENAME TO "recipe"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "quantity" integer NOT NULL, "recipe_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingredient"("id", "name", "quantity", "recipe_id") SELECT "id", "name", "quantity", "recipe_id" FROM "ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingredient" RENAME TO "ingredient"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "quantity" integer NOT NULL, "recipe_id" integer, CONSTRAINT "FK_1a884e9b70245ac229ded0d8248" FOREIGN KEY ("recipe_id") REFERENCES "recipe" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_ingredient"("id", "name", "quantity", "recipe_id") SELECT "id", "name", "quantity", "recipe_id" FROM "ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_ingredient" RENAME TO "ingredient"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredient" RENAME TO "temporary_ingredient"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "quantity" integer NOT NULL, "recipe_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "ingredient"("id", "name", "quantity", "recipe_id") SELECT "id", "name", "quantity", "recipe_id" FROM "temporary_ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "ingredient" RENAME TO "temporary_ingredient"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "quantity" integer NOT NULL, "recipe_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "ingredient"("id", "name", "quantity", "recipe_id") SELECT "id", "name", "quantity", "recipe_id" FROM "temporary_ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "recipe" RENAME TO "temporary_recipe"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "description" varchar NOT NULL, "preparation_time" integer NOT NULL, "cooking_time" integer NOT NULL, "servings" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipe"("id", "name", "description", "preparation_time", "cooking_time", "servings") SELECT "id", "name", "description", "preparation_time", "cooking_time", "servings" FROM "temporary_recipe"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipe"`);
    await queryRunner.query(
      `ALTER TABLE "ingredient" RENAME TO "temporary_ingredient"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "ingredient"("id", "name") SELECT "id", "name" FROM "temporary_ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "recipe" RENAME TO "temporary_recipe"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipe"("id", "name") SELECT "id", "name" FROM "temporary_recipe"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipe"`);
    await queryRunner.query(
      `ALTER TABLE "ingredient" RENAME TO "temporary_ingredient"`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "batchProperties" json NOT NULL, "referenceValue" float NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "ingredient"("id", "name") SELECT "id", "name" FROM "temporary_ingredient"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_ingredient"`);
    await queryRunner.query(
      `ALTER TABLE "recipe" RENAME TO "temporary_recipe"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "details" json NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "recipe"("id", "name") SELECT "id", "name" FROM "temporary_recipe"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_recipe"`);
  }
}
