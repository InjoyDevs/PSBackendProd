import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class SecondaryTypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('secondary_database.type', { infer: true }),
      url: this.configService.get('secondary_database.url', { infer: true }),
      host: this.configService.get('secondary_database.host', { infer: true }),
      port: this.configService.get('secondary_database.port', { infer: true }),
      username: this.configService.get('secondary_database.username', {
        infer: true,
      }),
      password: this.configService.get('secondary_database.password', {
        infer: true,
      }),
      database: this.configService.get('secondary_database.name', {
        infer: true,
      }),
      synchronize: this.configService.get('secondary_database.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      logging:
        this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
      extra: {
        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        max: this.configService.get('database.maxConnections', { infer: true }),
        ssl: this.configService.get('database.sslEnabled', { infer: true })
          ? {
              rejectUnauthorized: this.configService.get(
                'database.rejectUnauthorized',
                { infer: true },
              ),
              ca:
                this.configService.get('database.ca', { infer: true }) ??
                undefined,
              key:
                this.configService.get('database.key', { infer: true }) ??
                undefined,
              cert:
                this.configService.get('database.cert', { infer: true }) ??
                undefined,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
