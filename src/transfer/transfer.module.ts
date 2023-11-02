import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { DeviceModule } from 'src/device/device.module';
import { RecipeModule } from 'src/recipe/recipe.module';
import { Recipe } from 'src/recipe/entities/recipe.primary.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transfer, Recipe, Inventory]),
    DeviceModule,
    RecipeModule,
  ],
  providers: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
