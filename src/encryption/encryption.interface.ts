import { DeviceInstructionFormatDto } from './dto/device-instruction-format.dto';
import { KeyPair, PrivateKeyDto } from './dto/key-pair.dto';

export abstract class EncryptionInterface {
  abstract encryptData(data: string): string;
  abstract decrptData(data: string): string;
  abstract generateKeyPair(keyPair: KeyPair): Promise<PrivateKeyDto>;
  abstract encryptDockWithPublic(
    dockId: number,
    data: DeviceInstructionFormatDto,
  ): Promise<string>;
  abstract decryptDockWithPublic(
    dockId: number,
    data: string,
  ): Promise<DeviceInstructionFormatDto>;
}
