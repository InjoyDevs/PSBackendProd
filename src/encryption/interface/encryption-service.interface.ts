import {
  EncryptDtoBodyDto,
  EncryptDtoResponseDto,
} from '../dto/encrypt-data.dto';
import { GetDockKeys, RequestDockKeys } from '../types/dock-keys';

export interface EncryptionServiceInterface {
  encryptData(
    encryptDtoBodyDto: EncryptDtoBodyDto,
  ): Promise<EncryptDtoResponseDto>;
  decryptData(
    encryptDtoResponseDto: EncryptDtoResponseDto,
  ): Promise<EncryptDtoBodyDto>;
  getPublicKey(requestDockKeys: RequestDockKeys): GetDockKeys;
  validateCertificate(domain: string): boolean;
}
