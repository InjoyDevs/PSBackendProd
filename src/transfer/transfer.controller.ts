import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from './entities/transfer.entity';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  TransferGetQtySetForRefillDto,
  TransferGetQtySetForRecipeDto,
  StartTransferDto,
  UpdateTransferDto,
} from './dto/transfer.dto';

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

  @Get('qty-set-for-refill')
  @ApiOperation({
    summary: 'Get Quantity Set for Refill --------------Done--------------',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async transferGetQtySetForRefill(
    @Query() transferRefillDto: TransferGetQtySetForRefillDto,
  ) {
    return await this.transferService.transferGetQtySetForRefill(
      transferRefillDto,
    );
  }

  @Get('qty-set-for-recipe/:id')
  @ApiOperation({
    summary: 'Get Quantity Set for Recipe --------------Done--------------',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async transferGetQtySetForRecipe(
    @Param('id') recipeId: number, // Use @Param instead of @Query
    @Query() transferRecipeDto: TransferGetQtySetForRecipeDto,
  ) {
    return await this.transferService.transferGetQtySetForRecipe(
      recipeId,
      transferRecipeDto,
    );
  }

  @Get('qty-set-for-temp-recipe/:id')
  @ApiOperation({
    summary: 'Get Quantity Set for Recipe --------------Done--------------',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({
    name: 'recipeId',
  })
  @ApiQuery({
    name: 'dockId',
  })
  @ApiParam({
    name: 'id',
  })
  async transferGetQtySetForTempRecipe(
    @Param('id') recipeIdFrom: number, // Use @Param instead of @Query
    @Query('dockId') dockId: number,
    @Query('recipeId') recipeIdTo: number,
  ) {
    return await this.transferService.transferGetQtySetForTempRecipe(
      recipeIdFrom,
      {
        recipeId: recipeIdTo,
        dockId: dockId,
      },
    );
  }

  @Post('transfer-start/:id')
  @ApiOperation({ summary: 'Start a transfer' })
  @ApiResponse({
    status: 201,
    description: 'The transfer has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async startTransfer(@Param() id, @Body() startTransferDto: StartTransferDto) {
    return await this.transferService.startTransfer(id, startTransferDto);
  }

  @Post('transfer-start/:id')
  @ApiOperation({ summary: 'Start a transfer' })
  @ApiResponse({
    status: 201,
    description: 'The transfer has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateTransfer(
    @Param() id,
    @Body() updateTransferDto: UpdateTransferDto,
  ) {
    return await this.transferService.updateTransfer(id, updateTransferDto);
  }

  @Post('pause')
  @HttpCode(200)
  @ApiOperation({ summary: 'Pause a transfer' })
  async pauseTransfer(@Param() id: number): Promise<any> {
    return await this.transferService.pause(id);
  }

  @Post('resume')
  @HttpCode(200)
  @ApiOperation({ summary: 'Resume a transfer' })
  async resumeTransfer(@Param() id: number): Promise<any> {
    return await this.transferService.resume(id);
  }

  @Post('complete')
  @HttpCode(200)
  @ApiOperation({ summary: 'Complete a transfer' })
  async completeTransfer(@Param() id: number): Promise<any> {
    return await this.transferService.complete(id);
  }

  @Post('terminate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Terminate a transfer' })
  async terminateTransfer(@Param() id: number): Promise<any> {
    return await this.transferService.terminate(id);
  }

  @Post('timeout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Timeout a transfer' })
  async timeoutTransfer(@Param() id: number): Promise<any> {
    return await this.transferService.timeout(id);
  }
}
