import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { EncryptionInterface } from './encryption.interface';
import { KeyPair, PrivateKeyDto } from './dto/key-pair.dto';
import * as crypto from 'crypto';
import { DockService } from 'src/device/dock.service';
import { DeviceInstructionFormatDto } from './dto/device-instruction-format.dto';

@Injectable()
export class EncryptionService implements EncryptionInterface {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly dockService: DockService,
  ) {}
  async encryptDockWithPublic(dockId: number, data: any): Promise<string> {
    const dockPublicKey = await this.dockService.getDock(dockId);
    const publicKey = dockPublicKey?.public_key;
    if (publicKey === undefined) {
      throw new UnprocessableEntityException(
        "Dock Don't have public certificate",
      );
    }
    const encrypedData = crypto.publicEncrypt(
      {
        key: this.decrptData(dockPublicKey?.public_key || '') || '',
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data),
    );
    return encrypedData.toString('base64');
  }
  async decryptDockWithPublic(
    dockId: number,
    data: any,
  ): Promise<DeviceInstructionFormatDto> {
    const dockPublicKey = await this.dockService.getDock(dockId);
    const publicKey = dockPublicKey?.public_key;
    if (publicKey === undefined) {
      throw new UnprocessableEntityException(
        "Dock Don't have public certificate",
      );
    }
    const decrptedData = crypto
      .privateDecrypt(
        {
          key: this.decrptData(dockPublicKey?.public_key || '') || '',
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(data),
      )
      .toString('utf-8');
    const parsedDecryptedData = JSON.parse(decrptedData);
    return {
      deviceId: parsedDecryptedData.deviceId,
      dockId: parsedDecryptedData.dockId,
      metaData: parsedDecryptedData.metaData,
    };
  }

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
  async generateKeyPair(keyPair: KeyPair): Promise<PrivateKeyDto> {
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
    await this.dockService.updateDock(
      keyPair.dockId,
      this.encryptData(publicKey),
    );
    return {
      privateKey: privateKey,
    };
  }
}
