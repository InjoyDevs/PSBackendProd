import { ApiProperty } from '@nestjs/swagger';

export class GenericDto {
  @ApiProperty({
    example: 'Status of the request',
  })
  status: string;

  @ApiProperty({
    example: 'Message of the request',
  })
  message: string;
}
