import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable implements MigrationInterface {
  name = 'CreateTable.ts1690779922226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "device" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "location" text NOT NULL, "pumpData" json NOT NULL, "dockDetails" json NOT NULL, "digitalSignature" text NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "currentVolume" float NOT NULL, "capacity" float NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "batchProperties" json NOT NULL, "referenceValue" float NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deviceId" integer NOT NULL, "recipeId" integer NOT NULL, "volume" float NOT NULL)`,
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
      `CREATE TABLE "recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "details" json NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "transfer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sourceDeviceId" integer NOT NULL, "destinationDeviceId" integer NOT NULL, "ingredientId" integer NOT NULL, "transferredVolume" float NOT NULL)`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "transfer"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
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
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(`DROP TABLE "inventory"`);
    await queryRunner.query(`DROP TABLE "device"`);
  }
}
