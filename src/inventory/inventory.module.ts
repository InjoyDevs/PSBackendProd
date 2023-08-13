import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { DeviceModule } from 'src/device/device.module';
import { AdvsMgDevices } from 'src/device/entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, AdvsMgDevices]), DeviceModule],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}
