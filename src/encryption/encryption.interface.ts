import { KeyPair } from './dto/key-pair.dto';

export abstract class EncryptionInterface {
  abstract encryptData(data: string): string;
  abstract decrptData(data: string): string;
  abstract generateKeyPair(keyPair: KeyPair): any;
}
