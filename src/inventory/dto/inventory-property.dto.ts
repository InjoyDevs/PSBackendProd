import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

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
