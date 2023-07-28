import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({ description: 'The device ID' })
  deviceId: number;

  @ApiProperty({ description: 'The ingredient ID' })
  ingredientId: number;

  @ApiProperty({ description: 'The current volume of the ingredient' })
  currentVolume: number;

  @ApiProperty({ description: 'The capacity of the ingredient' })
  capacity: number;
}
