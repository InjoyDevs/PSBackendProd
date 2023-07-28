import { Controller, Post, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from './entities/transfer.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new transfer' })
  @ApiResponse({
    status: 201,
    description: 'The transfer has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createTransfer(@Body() transfer: Transfer): Promise<Transfer> {
    return this.transferService.createTransfer(transfer);
  }
}
