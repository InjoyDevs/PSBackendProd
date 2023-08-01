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
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, secondaryDatabaseConfig],
      envFilePath: ['.env'],
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    TypeOrmModule.forRootAsync({
      name: 'secondaryDatabase',
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
  ],
})
export class AppModule {}
