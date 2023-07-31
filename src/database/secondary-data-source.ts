import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const SecondaryDataSource = new DataSource({
  type: process.env.SECONDARY_DATABASE_TYPE,
  url: process.env.SECONDARY_DATABASE_URL,
  host: process.env.SECONDARY_DATABASE_HOST,
  port: process.env.SECONDARY_DATABASE_PORT
    ? parseInt(process.env.SECONDARY_DATABASE_PORT, 10)
    : 5432,
  username: process.env.SECONDARY_DATABASE_USERNAME,
  password: process.env.SECONDARY_DATABASE_PASSWORD,
  database: process.env.SECONDARY_DATABASE_NAME,
  synchronize: process.env.SECONDARY_DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  extra: {
    // based on https://node-postgres.com/api/pool
    // max connection pool size
    max: process.env.SECONDARY_DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.SECONDARY_DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    ssl:
      process.env.SECONDARY_DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized:
              process.env.SECONDARY_DATABASE_REJECT_UNAUTHORIZED === 'true',
            ca: process.env.SECONDARY_DATABASE_CA ?? undefined,
            key: process.env.SECONDARY_DATABASE_KEY ?? undefined,
            cert: process.env.SECONDARY_DATABASE_CERT ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);
