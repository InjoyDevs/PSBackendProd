// relative-level.dto.ts
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class RelativeLevelDTO {
  @IsNotEmpty()
  @IsBoolean()
  isIncreased: boolean;
}
