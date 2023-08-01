import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './entities/transfer.entity';
import { DeviceModule } from 'src/device/device.module';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer]), DeviceModule, RecipeModule],
  providers: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
