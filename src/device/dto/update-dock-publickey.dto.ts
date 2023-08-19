import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDockPublickKeyDto {
  @IsNotEmpty()
  @IsNumber()
  dock_point_id: number;

  @IsNotEmpty()
  @IsString()
  public_key: string;
}
