import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
} from 'class-validator';

class IngredientBatch {
  @IsString()
  id: string;

  @IsArray()
  properties: string[];

  @IsNumber()
  transferredVolume: number;
}

export class InventoryPropertyDto {
  @IsOptional()
  @IsString()
  batchId: string;

  @IsOptional()
  @IsString()
  encryptedData?: string;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @IsArray()
  ingredients?: IngredientBatch[];
}

export class SetInventoryDto {
  @ApiProperty({
    description: 'Inventory level to set (between 0 and tank capacity)',
    type: Number,
    example: 50,
  })
  @IsNumber()
  level: number;
}

export class InventoryLevelChangeDto {
  @ApiProperty({
    description: 'Change value for altering inventory level',
    type: Number,
    example: 10,
  })
  @IsNumber()
  change: number;

  @ApiProperty({
    description:
      'Flag indicating whether to add (true) or subtract (false) the change value',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  isPositive: boolean;
  // subract add ispositive
}
