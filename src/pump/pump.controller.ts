import { Controller, Post, Body } from '@nestjs/common';
import { PumpService } from './pump.service';
import { Pump } from './entities/pump.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pumps')
@Controller('pumps')
export class PumpController {
  constructor(private pumpService: PumpService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new pump' })
  @ApiResponse({
    status: 201,
    description: 'The pump has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPump(@Body() pump: Pump): Promise<Pump> {
    return this.pumpService.createPump(pump);
  }

  @Post('run-cip')
  async runCIP() {
    return await this.pumpService.runCIP();
  }
}
