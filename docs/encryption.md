# Encryption Module

## How to use

1. In the module where you wanna use it , import the module

```ts
import { EncryptionModule } from 'src/encryption/encryption.module';
@Module({
  imports: [EncryptionModule],
  providers: [],
  exports: [],
})
export class MyModuleModule {}
```

2. Then in other to use it in your service , inject the service

```ts
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class MyServiceService {
  constructor(private encryptionService: EncryptionService) {}
}
```
