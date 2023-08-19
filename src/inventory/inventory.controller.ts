import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import {
  InventoryLevelChangeDto,
  InventoryPropertyDto,
  SetInventoryDto,
} from './dto/inventory-property.dto';

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

  @Get('level/:id')
  @ApiOperation({ summary: 'Get inventory level for a device' })
  @ApiParam({
    name: 'id',
    description: 'Enter Inventory  Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve inventory level successfully',
    type: Number, // Response type is a number in this case
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getLevel(@Param('id') id: number) {
    return await this.inventoryService.getLevel(id);
  }

  @Post('level/:id')
  @ApiOperation({ summary: 'Set inventory level for a device' })
  @ApiResponse({
    status: 201,
    description: 'Inventory level set successfully',
  })
  @ApiParam({
    name: 'id',
    description: 'Enter Inventory Id',
    example: 1,
  })
  @ApiBody({
    description: 'Request body to set inventory level within constraints',
    type: SetInventoryDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async setLevel(
    @Param('id') id: number,
    @Body() setInventory: SetInventoryDto,
  ) {
    return await this.inventoryService.setLevel(id, setInventory.level);
  }

  @Put('level/:id')
  @ApiOperation({ summary: 'Alter inventory level for a device' })
  @ApiResponse({
    status: 200,
    description: 'Inventory level altered successfully',
  })
  @ApiParam({
    name: 'id',
    description: 'Enter Inventory  Id',
  })
  @ApiBody({
    description: 'Request body to alter inventory level within constraints',
    type: InventoryLevelChangeDto,
  })
  async alterLevel(
    @Param('id') inventoryId: number,
    @Body() changeDto: InventoryLevelChangeDto,
  ) {
    return await this.inventoryService.alterLevel(
      inventoryId,
      changeDto.change,
      changeDto.isPositive,
    );
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
