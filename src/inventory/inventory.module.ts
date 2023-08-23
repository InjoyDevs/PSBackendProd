import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { DeviceModule } from 'src/device/device.module';
import { AdvsMgDevices } from 'src/device/entities/device.entity';
import { DockPointNozzleTankIngMapping } from 'src/device/entities/dock/dock_point_nozzle_tank_ing_mapping.entity';
import { AdvsMvDeviceIoDock } from 'src/device/entities/dock/advs_mv_device_io_dock.entity';
import { InvtTdDvsIngrBatchVolStat } from './entities/invt_td_dvs_ingr_batch_vol_stat.entity';
import { InvtTdIngredientBatch } from './entities/invt_td_ingredient_batch.entity';
import { IngrMgIngredients } from 'src/ingredient/entities/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventory,
      AdvsMgDevices,
      DockPointNozzleTankIngMapping,
      AdvsMvDeviceIoDock,
      InvtTdDvsIngrBatchVolStat,
      InvtTdIngredientBatch,
      IngrMgIngredients,
    ]),
    DeviceModule,
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}
