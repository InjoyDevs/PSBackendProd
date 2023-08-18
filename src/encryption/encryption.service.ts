import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { EncryptionInterface } from './encryption.interface';
import { KeyPair } from './dto/key-pair.dto';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService implements EncryptionInterface {
  constructor(private configService: ConfigService<AllConfigType>) {}

  encryptData(data: string): string {
    const publicKey = this.configService.getOrThrow(
      'encryption.encryptionDatabasePublicKey',
      {
        infer: true,
      },
    );
    const encrypedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data),
    );
    return encrypedData.toString('base64');
  }

  decrptData(data: string): string {
    const privateKey = this.configService.getOrThrow(
      'encryption.encryptionDatabasePrivateKey',
      {
        infer: true,
      },
    );
    const decrptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data),
    );
    return decrptedData.toString('utf-8');
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
