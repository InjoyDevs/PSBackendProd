import { ApiProperty } from '@nestjs/swagger';

export class CreatePumpDto {
  @ApiProperty({ description: 'The device ID' })
  deviceId: number;

  // TODO: Update this with the db fields
  @ApiProperty({ description: 'The calibration data of the pump' })
  calibrationData: object;

  // TODO: Update this with the db fields
  @ApiProperty({ description: 'The pumping instructions of the pump' })
  pumpingInstructions: object;
}
