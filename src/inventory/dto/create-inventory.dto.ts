import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { GenericDto } from 'src/utils/dto/generic.dto';

class ingredientProperties {
  @ApiProperty({
    description: 'Item Viscosity',
  })
  @IsOptional()
  viscosity: number;

  @ApiProperty({
    description: 'Item Density',
  })
  @IsOptional()
  density: number;
}

export class CreateInventoryDto {
  @ApiProperty({ description: 'The device ID' })
  @IsNotEmpty()
  deviceId: number;

  @ApiProperty({ description: 'The ingredient ID' })
  @IsNotEmpty()
  ingredientId: number;

  @ApiProperty({ description: 'The Dock Id' })
  dockId: number;

  @ApiProperty({ description: 'The Tank Id' })
  tankId: number;

  @ApiProperty({ description: 'The current volume of the ingredient' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Ingredient Properties',
  })
  ingredientProperties: ingredientProperties;

  @ApiProperty({
    description: 'Ingredient Expiration Date',
  })
  expiration: Date;
}

class InventoryIdBody {
  @ApiProperty()
  inventoryId: number;
}

export class CreateInventoryResponseDto extends GenericDto {
  @ApiProperty()
  data: InventoryIdBody;
}
