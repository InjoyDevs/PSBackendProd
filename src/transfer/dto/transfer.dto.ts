import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';

export class TransferGetQtySetForRefillDto {
  @ApiProperty({ description: 'The ID of the hub' })
  hubId: number;

  @ApiProperty({ description: 'The ID of the dock' })
  dockId: number;

  @ApiProperty({ description: 'The ID of the dispenser' })
  dispenserId: number;

  @ApiProperty({
    description: 'List of ingredient batch volume details',
    type: [
      {
        ingredient: Ingredient,
        batch: {},
        transferredVolume: Number,
      },
    ],
    isArray: true,
  })
  ingredientBatchVolumeList: {
    ingredient: Ingredient;
    batch: any;
    transferredVolume: number;
  }[];
}

export class TransferGetQtySetForRecipeDto {
  @ApiProperty({ description: 'The ID of the device' })
  deviceId: number;

  @ApiProperty({ description: 'The ID of the dock' })
  dockId: number;

  @ApiProperty({ description: 'The ID of the recipe' })
  recipeId: number;

  @ApiProperty({ description: 'Quantity of the recipe' })
  qty: number;
}

export class TransferGetQtySetForTempRecipe {
  @ApiProperty({ description: 'The ID of the device' })
  deviceId: number;

  @ApiProperty({ description: 'The ID of the dock' })
  dockId: number;

  @ApiProperty({ description: 'The recipe object', type: Object })
  recipe: any;
}

export class StartTransferDto {
  dockId: number;
  dispenserId: number;
}

export class UpdateTransferDto {
  dockId: number;
  dispenserId: number;
}
