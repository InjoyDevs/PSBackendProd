import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryPropertyDto } from './dto/inventory-property.dto';

@ApiTags('inventories')
@Controller('inventories')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new inventory' })
  @ApiResponse({
    status: 201,
    description: 'The inventory has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createInventory(@Body() inventory: Inventory): Promise<Inventory> {
    return this.inventoryService.createInventory(inventory);
  }

  @Post('initialize-inventory-inmemory/:id')
  @ApiOperation({ summary: 'Initialize inventory in-memory by device ID' })
  @ApiResponse({
    status: 200,
    description: 'The inventory has been successfully initialized in-memory.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async proprietaryServiceInitializeInventory(@Param() id: number) {
    return this.inventoryService.proprietaryServiceInitializeInventory(id);
  }

  @Post('initialize-inventory-all')
  @ApiOperation({ summary: 'Initialize all inventories' })
  @ApiResponse({
    status: 200,
    description: 'All inventories were successfully initialized',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async initializeAllInventories() {
    return this.inventoryService.initializeAllInventories();
  }

  @Get('level')
  @ApiOperation({ summary: 'Get inventory level for a device' })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getLevel(@Param() id: number) {
    return await this.inventoryService.getLevel(id);
  }

  @Post('level')
  @ApiOperation({ summary: 'Set inventory level for a device' })
  @ApiResponse({
    status: 200,
    description: 'Inventory level set successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async setLevel(@Param('id') id: number, @Body() body: { level: number }) {
    return await this.inventoryService.setLevel(id, body.level);
  }

  @Put('level')
  @ApiOperation({ summary: 'Alter inventory level for a device' })
  @ApiResponse({
    status: 200,
    description: 'Inventory level altered successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async alterLevel(
    @Param('id') deviceId: number,
    @Body('changeAmount') changeAmount: number,
  ) {
    return await this.inventoryService.alterLevel(deviceId, changeAmount);
  }

  @Get('property')
  @ApiOperation({ summary: 'Get encrypted properties for all batches' })
  async getProperties(): Promise<any> {
    return await this.inventoryService.getProperties();
  }

  @Post('property')
  @ApiOperation({ summary: 'Set encrypted properties for a specific batch' })
  async setProperties(
    @Body() inventoryPropertyDto: InventoryPropertyDto,
  ): Promise<any> {
    return await this.inventoryService.setProperties(inventoryPropertyDto);
  }

  @Post('set-property')
  @ApiOperation({ summary: 'Set encrypted properties for a specific batch' })
  async setPropertiesBatch(
    @Body() inventorySetPropertyDto: InventoryPropertyDto,
  ): Promise<any> {
    return await this.inventoryService.setPropertiesBatch(
      inventorySetPropertyDto,
    );
  }

  @Post('store-value')
  @ApiOperation({ summary: 'Publish data to be stored in main database' })
  async storeValue(
    @Body() inventoryStoreValueDto: InventoryPropertyDto,
  ): Promise<any> {
    return await this.inventoryService.storeValue(inventoryStoreValueDto);
  }

  @Post('update-value')
  @ApiOperation({
    summary: 'Create new batch property value for given mix of two batches',
  })
  async updateValue(
    @Body() inventoryUpdateValueDto: InventoryPropertyDto,
  ): Promise<any> {
    return await this.inventoryService.updateValue(inventoryUpdateValueDto);
  }

  @Post('reset')
  async resetInventory() {
    return await this.inventoryService.resetInventory();
  }
}
