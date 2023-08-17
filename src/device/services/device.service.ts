import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvsMgDevices } from '../entities/device.entity';
import { DeviceSecondaryRepository } from '../repositories/device.secondary.repository';
import { SysCatConfig } from '../entities/sys_cat_config.entity';
import { AdvsMvDeviceIoDock } from '../entities/dock/advs_mv_device_io_dock.entity';
import { AdvsMvIoDockPartsLink } from '../entities/dock/advs_mv_io_dock_parts_link.entity';
import { DockPointNozzleTankIngMapping } from '../entities/dock/dock_point_nozzle_tank_ing_mapping.entity';
import { AdvsMvPartsLink } from '../entities/part/advs_mv_parts_link.entity';
import { AprtMgPartDigitalId } from '../entities/part/aprt_mg_part_digital_id.entity';
import { AprtMvPartDigitalId } from '../entities/part/aprt_mv_part_digital_id.entity';
import { AprtMvPartDigitalSignature } from '../entities/part/aprt_mv_part_digital_signature.entity';
import { DeviceCurrentLocation } from '../entities/device_current_location.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(AdvsMgDevices)
    private deviceRepository: Repository<AdvsMgDevices>,
    @InjectRepository(AdvsMvDeviceIoDock)
    private advsMvDeviceIoDockRepository: Repository<AdvsMvDeviceIoDock>,
    @InjectRepository(AdvsMvIoDockPartsLink)
    private advsMvIoDockPartsLinkRepository: Repository<AdvsMvIoDockPartsLink>,
    @InjectRepository(DockPointNozzleTankIngMapping)
    private dockPointNozzleTankIngMappingRepository: Repository<DockPointNozzleTankIngMapping>,
    @InjectRepository(AdvsMvPartsLink)
    private advsMvPartsLinkRepository: Repository<AdvsMvPartsLink>,
    @InjectRepository(AprtMgPartDigitalId)
    private aprtMgPartDigitalIdRepository: Repository<AprtMgPartDigitalId>,
    @InjectRepository(AprtMvPartDigitalId)
    private aprtMvPartDigitalIdRepository: Repository<AprtMvPartDigitalId>,
    @InjectRepository(AprtMvPartDigitalSignature)
    private aprtMvPartDigitalSignatureRepository: Repository<AprtMvPartDigitalSignature>,
    @InjectRepository(DeviceCurrentLocation)
    private deviceCurrentLocationRepository: Repository<DeviceCurrentLocation>,
    @InjectRepository(SysCatConfig)
    private sysCatConfigRepository: Repository<SysCatConfig>,
    private deviceSecondaryRepository: DeviceSecondaryRepository,
  ) {}

  async registerNewDevice(device: AdvsMgDevices): Promise<AdvsMgDevices> {
    return await this.deviceRepository.save(device);
  }

  async initializeDevices() {
    const advsMvPartsLinkSecondaryDb =
      await this.deviceSecondaryRepository.getAllAdvsMvPartsLink();
    const advsMgDevicesSecondaryDb =
      await this.deviceSecondaryRepository.getAllDevices();
    const sysCatConfigSecondaryDb =
      await this.deviceSecondaryRepository.getAllSysCatConfig();
    const advsMvDeviceIoDockSecondaryDb =
      await this.deviceSecondaryRepository.getAllAdvsMvDeviceIoDock();
    const advsMvIoDockPartsLinkSecondaryDb =
      await this.deviceSecondaryRepository.getAllAdvsMvIoDocPartsLink();
    const dockPointNozzleTankIngMappingSecondaryDb =
      await this.deviceSecondaryRepository.getAllDockPointNozzleTankIngMapping();
    const aprtMgPartDigitalIdSecondaryDb =
      await this.deviceSecondaryRepository.getAllMgPartDigitalId();
    const aprtMvPartDigitalIdSecondaryDb =
      await this.deviceSecondaryRepository.getAllMvPartDigitalId();
    const aprtMvPartDigitalSignatureSecondaryDb =
      await this.deviceSecondaryRepository.getAllAprtMvPartDigitalSignature();
    const deviceCurrentLocationSecondaryDb =
      await this.deviceSecondaryRepository.getAllDeviceCurrentLocation();

    console.log({ advsMvIoDockPartsLinkSecondaryDb });

    for (const advsMvDeviceIoDock of advsMvDeviceIoDockSecondaryDb) {
      await this.advsMvDeviceIoDockRepository.save(advsMvDeviceIoDock);
    }
    for (const systemConfig of sysCatConfigSecondaryDb) {
      await this.sysCatConfigRepository.save(systemConfig);
    }
    for (const advsMvPartsLink of advsMvPartsLinkSecondaryDb) {
      await this.advsMvPartsLinkRepository.save(advsMvPartsLink);
    }

    for (const aprtMgPartDigitalId of aprtMgPartDigitalIdSecondaryDb) {
      await this.aprtMgPartDigitalIdRepository.save(aprtMgPartDigitalId);
    }
    for (const aprtMvPartDigitalId of aprtMvPartDigitalIdSecondaryDb) {
      await this.aprtMvPartDigitalIdRepository.save(aprtMvPartDigitalId);
    }
    for (const aprtMvPartDigitalSignature of aprtMvPartDigitalSignatureSecondaryDb) {
      await this.aprtMvPartDigitalSignatureRepository.save(
        aprtMvPartDigitalSignature,
      );
    }
    for (const deviceCurrentLocation of deviceCurrentLocationSecondaryDb) {
      await this.deviceCurrentLocationRepository.save(deviceCurrentLocation);
    }
    for (const advsMvIoDockPartsLink of advsMvIoDockPartsLinkSecondaryDb) {
      await this.advsMvIoDockPartsLinkRepository.save(advsMvIoDockPartsLink);
    }
    for (const dockPointNozzleTankIngMapping of dockPointNozzleTankIngMappingSecondaryDb) {
      await this.dockPointNozzleTankIngMappingRepository.save(
        dockPointNozzleTankIngMapping,
      );
    }
    for (const advsMgDevice of advsMgDevicesSecondaryDb) {
      await this.deviceRepository.save(advsMgDevice);
    }
  }
  async proprietaryServiceUpdateDevice(deviceId: number) {
    const findDevice = await this.deviceRepository.findOne({
      where: { device_id: deviceId.toString() },
    });
    if (!findDevice)
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    // TODO:: implement code to update/add this device to the in-memory SQLite DB
  }
  async getDeviceById(id: number): Promise<AdvsMgDevices> {
    const device = await this.deviceRepository.findOne({
      where: { id: id },
    });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }
}
