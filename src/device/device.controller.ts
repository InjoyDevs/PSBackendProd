import { Controller, Post, Body } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './entities/device.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('devices')
@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new device' })
  @ApiResponse({
    status: 201,
    description: 'The device has been successfully registered.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async registerNewDevice(@Body() device: Device): Promise<Device> {
    return this.deviceService.registerNewDevice(device);
  }
}
