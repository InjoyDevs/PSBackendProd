import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { EncryptionInterface } from './encryption.interface';
import { KeyPair } from './dto/key-pair.dto';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService implements EncryptionInterface {
  constructor(private configService: ConfigService<AllConfigType>) {}
  encryptData() {
    throw new Error('Method not implemented.');
  }
  decrptData() {
    throw new Error('Method not implemented.');
  }
  generateKeyPair(keyPair: KeyPair) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });
    console.log(privateKey, publicKey, keyPair);
    // TODO: STORE THE PUBLIC KEY TO THE DATABASE
    // TODO: SEND THE PRIVATE KEY TO THE DOCK
  }
}
