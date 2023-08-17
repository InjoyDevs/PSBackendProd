import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { DeviceService } from './device.service';
import { AdvsMgDevices } from './entities/device.entity';
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
  async registerNewDevice(
    @Body() device: AdvsMgDevices,
  ): Promise<AdvsMgDevices> {
    return this.deviceService.registerNewDevice(device);
  }

  @Put('update-in-memory/:id')
  @ApiOperation({ summary: 'Add/update a device for PS in-memory' })
  @ApiResponse({
    status: 200,
    description: 'The device has been successfully added/updated in-memory',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  async proprietaryServiceUpdateDevice(@Param() id: number) {
    return this.deviceService.proprietaryServiceUpdateDevice(id);
  }

  @Put('initialize-devies')
  @ApiOperation({ summary: 'Initialize all devices' })
  @ApiResponse({
    status: 200,
    description: 'All devices have been successfully initialized',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async initializeDevices() {
    return await this.deviceService.initializeDevices();
  }
}
