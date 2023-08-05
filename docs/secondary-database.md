# Secondary Database (PostgreSQL)

## How to use

1. Inject the connection to the service to wanan use
   and notice that the name of the connection is `secondaryDatabase`

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

  // this is how you can use the connection

  async executeRawQueryConnection1() {
    const rawData = await this.connection1.query('SELECT * FROM your_table');
    return rawData;
  }
}
```
