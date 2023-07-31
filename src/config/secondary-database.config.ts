import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.SECONDARY_DATABASE_URL)
  @IsString()
  SECONDARY_DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.SECONDARY_DATABASE_URL)
  @IsString()
  SECONDARY_DATABASE_TYPE: string;

  @ValidateIf((envValues) => !envValues.SECONDARY_DATABASE_URL)
  @IsString()
  SECONDARY_DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.SECONDARY_DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  SECONDARY_DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.SECONDARY_DATABASE_URL)
  @IsString()
  @IsOptional()
  SECONDARY_DATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.SECONDARY_DATABASE_URL)
  @IsString()
  SECONDARY_DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.SECONDARY_DATABASE_URL)
  @IsString()
  SECONDARY_DATABASE_USERNAME: string;

  @IsBoolean()
  @IsOptional()
  SECONDARY_DATABASE_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  SECONDARY_DATABASE_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  SECONDARY_DATABASE_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  SECONDARY_DATABASE_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  SECONDARY_DATABASE_CA: string;

  @IsString()
  @IsOptional()
  SECONDARY_DATABASE_KEY: string;

  @IsString()
  @IsOptional()
  SECONDARY_DATABASE_CERT: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    url: process.env.SECONDARY_DATABASE_URL,
    type: process.env.SECONDARY_DATABASE_TYPE,
    host: process.env.SECONDARY_DATABASE_HOST,
    port: process.env.SECONDARY_DATABASE_PORT
      ? parseInt(process.env.SECONDARY_DATABASE_PORT, 10)
      : 5432,
    password: process.env.SECONDARY_DATABASE_PASSWORD,
    name: process.env.SECONDARY_DATABASE_NAME,
    username: process.env.SECONDARY_DATABASE_USERNAME,
    synchronize: process.env.SECONDARY_DATABASE_SYNCHRONIZE === 'true',
    maxConnections: process.env.SECONDARY_DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.SECONDARY_DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    sslEnabled: process.env.SECONDARY_DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized:
      process.env.SECONDARY_DATABASE_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.SECONDARY_DATABASE_CA,
    key: process.env.SECONDARY_DATABASE_KEY,
    cert: process.env.SECONDARY_DATABASE_CERT,
  };
});
