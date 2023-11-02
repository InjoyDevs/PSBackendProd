import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService<AllConfigType>) {}
  encryptData(data: string): string {
    //TODO: Either merge the branch feature/complete-encryption or implement it here
    return data;
  }
  decryptData(ciphertext: string): string {
    //TODO: Either merge the branch feature/complete-encryption or implement it here
    return ciphertext;
  }
}
