import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { SECONDARYDATABASE } from 'src/config/contants';
import { DataSource } from 'typeorm';

@Injectable()
export class DeviceSecondaryRepository {
  constructor(
    @InjectDataSource(SECONDARYDATABASE)
    private secondaryDatasource: DataSource,
  ) {}
  getAllDevices() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query(`SELECT * FROM advs_mg_devices`);
  }
  getAllSysCatConfig() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query(`SELECT * FROM sys_cat_config_n_values`);
  }
  getAllAdvsMvPartsLink() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query(`SELECT * FROM advs_mv_parts_link`);
  }
  getAllDeviceCurrentLocation() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query(`SELECT * FROM device_current_location`);
  }
  getAllMgPartDigitalId() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query(`SELECT * FROM aprt_mg_part_digital_id`);
  }
  getAllMvPartDigitalId() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query('SELECT * FROM aprt_mv_part_digital_id');
  }
  getAllAprtMvPartDigitalSignature() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query('SELECT * FROM aprt_mv_part_digital_signature');
  }
  getAllAdvsMvDeviceIoDock() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query('SELECT * FROM advs_mv_device_io_dock');
  }
  getAllAdvsMvIoDocPartsLink() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query('SELECT * FROM advs_mv_io_dock_parts_link');
  }
  getAllDockPointNozzleTankIngMapping() {
    return this.secondaryDatasource
      .createQueryRunner()
      .query('SELECT * FROM dock_point_nozzle_tank_ing_mapping');
  }
}
