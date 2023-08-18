import { KeyPair } from './dto/key-pair.dto';

export abstract class EncryptionInterface {
  abstract encryptData(): any;
  abstract decrptData(): any;
  abstract generateKeyPair(keyPair: KeyPair): any;
}
