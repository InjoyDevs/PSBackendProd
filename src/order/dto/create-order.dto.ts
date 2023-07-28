import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'The device ID' })
  deviceId: number;

  @ApiProperty({ description: 'The recipe ID' })
  recipeId: number;

  @ApiProperty({ description: 'The volume of the order' })
  volume: number;
}
