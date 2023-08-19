import { Controller, Post, Body, Put, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';
import { AdvsMgDevices } from './entities/device.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DockService } from './dock.service';
import { UpdateDockPublickKeyDto } from './dto/update-dock-publickey.dto';

@ApiTags('devices')
@Controller('device')
export class DeviceController {
  constructor(
    private deviceService: DeviceService,
    private dockService: DockService,
  ) {}

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
  @ApiBody({
    description: 'Request body to set inventory level within constraints',
    type: UpdateDeviceDto,
  })
  async proprietaryServiceUpdateDevice(@Body() updateDevice: UpdateDeviceDto) {
    return this.deviceService.proprietaryServiceUpdateDevice(updateDevice);
  }

  @Put('initialize-devies')
  @ApiOperation({ summary: 'Initialize all devices', tags: ['done'] })
  @ApiResponse({
    status: 200,
    description: 'All devices have been successfully initialized',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async initializeDevices() {
    return await this.deviceService.initializeDevices();
  }

  @Get('docks/public_key/:id')
  @ApiOperation({ summary: 'Get dock details by dock ID', tags: ['done'] })
  @ApiResponse({
    status: 200,
  })
  @ApiParam({
    name: 'id',
    description: 'Enter Inventory Id',
    example: 1,
  })
  async getPublicKey(@Param('id') id) {
    return this.dockService.getDock(id);
  }

  @Post('docks/public_key')
  @ApiOperation({ summary: 'Update dock details by dock ID', tags: ['done'] })
  @ApiResponse({
    status: 200,
    description: 'Dock details updated successfully',
  })
  @ApiParam({
    name: 'id',
    description: 'Enter Inventory Id',
  })
  @ApiBody({
    type: UpdateDockPublickKeyDto,
  })
  async updatePublicKey(@Body() dockPublicKey: UpdateDockPublickKeyDto) {
    return this.dockService.updateDock(
      dockPublicKey.dock_point_id,
      dockPublicKey.public_key,
    );
  }
}
