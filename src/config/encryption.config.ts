import { registerAs } from '@nestjs/config';
import { IsString, ValidateIf } from 'class-validator';
import { EncryptionConfig } from './config.type';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => !envValues.ENCRYPTION_ALGORITHM)
  @IsString()
  ENCRYPTION_ALGORITHM: string;

  @ValidateIf((envValues) => !envValues.ENCRYPTION_DATABASE_PUBLIC_KEY)
  @IsString()
  ENCRYPTION_DATABASE_PUBLIC_KEY: string;

  @ValidateIf((envValues) => envValues.ENCRYPTION_DATABASE_PRIVATE_KEY)
  @IsString()
  ENCRYPTION_DATABASE_PRIVATE_KEY: string;
}

export default registerAs<EncryptionConfig>('encryption', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    encryptionAlgorithm: process.env.ENCRYPTION_ALGORITHM || 'not_provided',
    encryptionDatabasePublicKey:
      process.env.ENCRYPTION_DATABASE_PUBLIC_KEY || 'not_provided',
    encryptionDatabasePrivateKey:
      process.env.ENCRYPTION_DATABASE_PRIVATE_KEY || 'not_provided',
  };
});
