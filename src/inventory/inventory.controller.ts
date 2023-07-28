import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
