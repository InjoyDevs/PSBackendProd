import { Module } from '@nestjs/common';
import { BatchController } from './controller/batch.controller';
import { BatchService } from './services/batch.service';

@Module({
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
