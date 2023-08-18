import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { SECONDARYDATABASE } from 'src/config/contants';
import { DataSource } from 'typeorm';

@Injectable()
export class InventorySecondaryRepository {
  constructor(
    @InjectDataSource(SECONDARYDATABASE)
    private secondaryDatasource: DataSource,
  ) {}
  getAllInvtTdDvsIngrBatchVolStat() {
    return this.secondaryDatasource.createQueryRunner().query(`
    SELECT * FROM invt_td_dvs_ingr_batch_vol_stat
    `);
  }
  getAllInvtTdIngredientBatch() {
    return this.secondaryDatasource.createQueryRunner().query(`
    SELECT * FROM 
    `);
  }
}
