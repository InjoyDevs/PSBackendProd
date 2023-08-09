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
  @IsNumber()
  level: number;
}

export class InventoryLevelChangeDto {
  @IsNumber()
  change: number;

  @IsBoolean()
  isPositive: boolean;
}
