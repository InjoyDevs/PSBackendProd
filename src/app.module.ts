import { Module } from '@nestjs/common';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import secondaryDatabaseConfig from './config/secondary-database.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { RecipeModule } from './recipe/recipe.module';
import { DeviceModule } from './device/device.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { PumpModule } from './pump/pump.module';
import { TransferModule } from './transfer/transfer.module';
import { SecondaryTypeOrmConfigService } from './database/secondary-typeorm-config.service';
import { SECONDARYDATABASE } from './config/contants';
import encryptionConfig from './config/encryption.config';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { LoggerModule } from 'nestjs-pino';
import { KafkaModule } from './kafka/kafka.module';

export const setUpLoggerModule = () => {
  if (process.env.NODE_ENV === 'production') {
    return LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => crypto.randomUUID(),
        timestamp: true,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        serializers: {
          req: (req) => {
            // Customize the request serializer to exclude unwanted headers
            return {
              method: req.method,
              url: req.url,
              // Exclude specific headers from being logged
              headers: {
                // Exclude 'authorization' header
                ...req.headers,
                authorization: undefined,
                cookie: undefined,
                cookies: undefined,
                'X-Token': undefined,
                'T-Token': undefined,
              },
              remoteAddress: req.remoteAddress,
              remotePort: req.remotePort,
            };
          },
        },
        stream: fs.createWriteStream(`logs/app.log`, { flags: 'a' }),
      },
    });
  } else {
    return LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => crypto.randomUUID(),
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        serializers: {
          req: (req) => {
            // Customize the request serializer to exclude unwanted headers
            return {
              method: req.method,
              url: req.url,
              // Exclude specific headers from being logged
              headers: {
                // Exclude 'authorization' header
                ...req.headers,
                authorization: undefined,
                cookie: undefined,
                cookies: undefined,
                'X-Token': undefined,
                'T-Token': undefined,
              },
              remoteAddress: req.remoteAddress,
              remotePort: req.remotePort,
            };
          },
        },
        transport: {
          target: 'pino-pretty',
        },
      },
    });
  }
};

@Module({
  imports: [
    setUpLoggerModule(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig,
        secondaryDatabaseConfig,
        encryptionConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    TypeOrmModule.forRootAsync({
      name: SECONDARYDATABASE,
      useClass: SecondaryTypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    //Commenting Out Users Module and Session module fo now
    // UsersModule,
    // SessionModule,
    RecipeModule,
    DeviceModule,
    IngredientModule,
    InventoryModule,
    OrderModule,
    PumpModule,
    TransferModule,
    KafkaModule,
  ],
})
export class AppModule {}
