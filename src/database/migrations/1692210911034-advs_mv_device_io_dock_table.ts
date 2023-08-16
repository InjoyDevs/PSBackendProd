import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdvsMvDeviceIoDockTable1692210911034
  implements MigrationInterface
{
  name = 'AdvsMvDeviceIoDockTable1692210911034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "advs_mv_device_io_dock" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "device_id" integer NOT NULL, "refill_point_category" integer NOT NULL, "name" varchar NOT NULL, "process_interface_type" integer NOT NULL, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "advs_mv_device_io_dock"`);
  }
}
