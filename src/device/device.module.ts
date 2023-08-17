import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvsMgDevices } from './entities/device.entity';
import { SECONDARYDATABASE } from 'src/config/contants';
import { DeviceSecondaryRepository } from './device.secondary.repository';
import { SysCatConfig } from './entities/sys_cat_config.entity';
import { AdvsMvPartsLink } from './entities/part/advs_mv_parts_link.entity';
import { AprtMgPartDigitalId } from './entities/part/aprt_mg_part_digital_id.entity';
import { AprtMvPartDigitalId } from './entities/part/aprt_mv_part_digital_id.entity';
import { AprtMvPartDigitalSignature } from './entities/part/aprt_mv_part_digital_signature.entity';
import { DeviceCurrentLocation } from './entities/device_current_location.entity';
import { AdvsMvDeviceIoDock } from './entities/dock/advs_mv_device_io_dock.entity';
import { AdvsMvIoDockPartsLink } from './entities/dock/advs_mv_io_dock_parts_link.entity';
import { DockPointNozzleTankIngMapping } from './entities/dock/dock_point_nozzle_tank_ing_mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdvsMgDevices,
      SysCatConfig,
      AdvsMvPartsLink,
      AprtMgPartDigitalId,
      AprtMvPartDigitalId,
      AprtMvPartDigitalSignature,
      DeviceCurrentLocation,
      AdvsMvDeviceIoDock,
      AdvsMvIoDockPartsLink,
      DockPointNozzleTankIngMapping,
    ]),
    TypeOrmModule.forFeature([], SECONDARYDATABASE),
  ],
  providers: [DeviceService, DeviceSecondaryRepository],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
