import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDeviceDto {
  @IsNotEmpty()
  @IsString()
  device_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  is_in_service: boolean;

  @IsNotEmpty()
  @IsString()
  template_id: string;

  @IsNotEmpty()
  @IsInt()
  version: number;

  @IsNotEmpty()
  @IsInt()
  level: number;

  @IsOptional()
  @IsString()
  current_location: string;

  @IsNotEmpty()
  @IsInt()
  device_type: number;

  @IsNotEmpty()
  @IsInt()
  created_by: number;

  @IsNotEmpty()
  @IsInt()
  modified_by: number;

  @IsOptional()
  @IsString()
  deleted_at: string;

  @IsNotEmpty()
  @IsString()
  created_at: string;

  @IsNotEmpty()
  @IsString()
  updated_at: string;
}
