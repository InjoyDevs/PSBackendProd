import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class SecondaryTypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('SECONDARYDATABASE.type', { infer: true }),
      url: this.configService.get('SECONDARYDATABASE.url', { infer: true }),
      host: this.configService.get('SECONDARYDATABASE.host', { infer: true }),
      port: this.configService.get('SECONDARYDATABASE.port', { infer: true }),
      username: this.configService.get('SECONDARYDATABASE.username', {
        infer: true,
      }),
      password: this.configService.get('SECONDARYDATABASE.password', {
        infer: true,
      }),
      database: this.configService.get('SECONDARYDATABASE.name', {
        infer: true,
      }),
      synchronize: this.configService.get('SECONDARYDATABASE.synchronize', {
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
