import { Body, Controller, Param, Post } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { KeyPair } from './dto/key-pair.dto';
import { DeviceInstructionFormatDto } from './dto/device-instruction-format.dto';

@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('encrypt')
  encryptDataController(@Body() data: string) {
    this.encryptionService.encryptData(data);
  }

  @Post('decrypt')
  decryptDataController(@Body() data: string) {
    this.encryptionService.decrptData(data);
  }

  @Post('generate-key-pair')
  generateKeyPair(@Body() data: KeyPair) {
    this.encryptionService.generateKeyPair(data);
  }

  @Post('encrypt-with-public/:dockId')
  encryptDockWithPublicController(
    @Body() data: DeviceInstructionFormatDto,
    @Param('dockId') dockId: number,
  ) {
    this.encryptionService.encryptDockWithPublic(dockId, data);
  }

  @Post('decrypt-with-public/:dockId')
  decryptDockWithPublicController(
    @Body() data: string,
    @Param('dockId') dockId: number,
  ) {
    this.encryptionService.decryptDockWithPublic(dockId, data);
  }
}
