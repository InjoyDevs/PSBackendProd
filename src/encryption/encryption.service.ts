import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import sodium from 'sodium-native';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService<AllConfigType>) {}
  encryptData(data: string): string {
    const nonce = this.configService.getOrThrow<string>('app.nonce', {
      infer: true,
    });
    const secretKey = this.configService.getOrThrow<string>('app.secretKey', {
      infer: true,
    });
    // Check if your nonce has the right length
    if (nonce.length != sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES) {
      throw new Error('Nonce is not the correct length');
    }
    // Check if your key has the right length
    if (
      secretKey.length != sodium.crypto_aead_xchacha20poly1305_ietf_KEYBYTES
    ) {
      throw new Error('Key is not the correct length');
    }

    const nonce_buffer = Buffer.from(nonce, 'utf-8');
    const secret_key_buffer = Buffer.from(secretKey, 'utf-8');
    const data_buffer = Buffer.from(data);
    const ciphertext_alloc = Buffer.alloc(
      data.length + sodium.crypto_aead_xchacha20poly1305_ietf_ABYTES,
    );
    sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
      ciphertext_alloc,
      data_buffer,
      null,
      null,
      nonce_buffer,
      secret_key_buffer,
    );
    return ciphertext_alloc.toString('utf-8');
  }
  decryptData(ciphertext: string): string {
    const nonce = this.configService.getOrThrow<string>('app.nonce', {
      infer: true,
    });
    const secretKey = this.configService.getOrThrow<string>('app.secretKey', {
      infer: true,
    });
    // Check if your nonce has the right length
    if (nonce.length != sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES) {
      throw new Error('Nonce is not the correct length');
    }
    // Check if your key has the right length
    if (
      secretKey.length != sodium.crypto_aead_xchacha20poly1305_ietf_KEYBYTES
    ) {
      throw new Error('Key is not the correct length');
    }
    const nonce_buffer = Buffer.from(nonce, 'utf-8');
    const secret_key_buffer = Buffer.from(secretKey, 'utf-8');
    const ciphertext_buffer = Buffer.from(ciphertext);
    const plain_text_alloc = Buffer.alloc(
      ciphertext.length - sodium.crypto_aead_xchacha20poly1305_ietf_ABYTES,
    );

    sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
      plain_text_alloc,
      null,
      ciphertext_buffer,
      null,
      nonce_buffer,
      secret_key_buffer,
    );
    if (!plain_text_alloc) {
      throw new Error('Decryption Failed');
    }
    return plain_text_alloc.toString('utf-8');
  }
}
