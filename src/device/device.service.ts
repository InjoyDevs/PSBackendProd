import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async registerNewDevice(device: Device): Promise<Device> {
    return await this.deviceRepository.save(device);
  }

  async proprietaryServiceUpdateDevice(deviceId: number) {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });
    if (!findDevice)
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    // TODO:: implement code to update/add this device to the in-memory SQLite DB
  }
  async getDeviceById(id: number): Promise<Device> {
    const device = await this.deviceRepository.findOne({ where: { id } });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }
}
