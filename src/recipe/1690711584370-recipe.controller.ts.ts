import { MigrationInterface, QueryRunner } from "typeorm";

export class Recipe.controller.ts1690711584370 implements MigrationInterface {
    name = 'Recipe.controller.ts1690711584370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "deviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "currentVolume" double precision NOT NULL, "capacity" double precision NOT NULL, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pump" ("id" SERIAL NOT NULL, "deviceId" integer NOT NULL, "calibrationData" json NOT NULL, "pumpingInstructions" json NOT NULL, CONSTRAINT "PK_21911377a19bae1d3697a5ecfd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device" ("id" SERIAL NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL, CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "preparation_time" integer NOT NULL, "cooking_time" integer NOT NULL, "servings" integer NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "recipe_id" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "deviceId" integer NOT NULL, "recipeId" integer NOT NULL, "volume" double precision NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "socialId" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`CREATE TABLE "transfer" ("id" SERIAL NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" double precision NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_1a884e9b70245ac229ded0d8248" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_1a884e9b70245ac229ded0d8248"`);
        await queryRunner.query(`DROP TABLE "transfer"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "device"`);
        await queryRunner.query(`DROP TABLE "pump"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
    }

}
