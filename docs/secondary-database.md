# Secondary Database (PostgreSQL)

## How to use

1. Inject the connection to the service to wanan use

```ts
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class YourService {
  constructor(
    @InjectConnection('secondaryDatabase')
    private readonly connection1: Connection,
  ) {}

  async executeRawQueryConnection1() {
    const rawData = await this.connection1.query('SELECT * FROM your_table');
    return rawData;
  }
}
```
