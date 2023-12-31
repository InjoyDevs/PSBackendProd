import { ApiProperty } from '@nestjs/swagger';

export class TransferGetQtySetForRefillDto {
  @ApiProperty({ description: 'The ID of the hub' })
  hubId: number;

  @ApiProperty({ description: 'The ID of the dock' })
  dockId: number;

  @ApiProperty({ description: 'The ID of the dispenser' })
  dispenserId: number;

  @ApiProperty({ description: 'The ID of the source device' })
  sourceDeviceId: number;
}

export class TransferGetQtySetForRecipeDto {
  @ApiProperty({ description: 'The ID of the Recipe' })
  recipeId: number;

  @ApiProperty({ description: 'The ID of the dock' })
  dockId: number;
}

export class TransferGetQtySetForTempRecipe {
  @ApiProperty({ description: 'The ID of the Recipe' })
  recipeId: number;

  @ApiProperty({ description: 'The ID of the dock' })
  dockId: number;
}

export class StartTransferDto {
  dockId: number;
  dispenserId: number;
}

export class UpdateTransferDto {
  dockId: number;
  dispenserId: number;
}
