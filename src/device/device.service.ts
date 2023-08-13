import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvsMgDevices } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(AdvsMgDevices)
    private deviceRepository: Repository<AdvsMgDevices>,
  ) {}

  async registerNewDevice(device: AdvsMgDevices): Promise<AdvsMgDevices> {
    return await this.deviceRepository.save(device);
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
