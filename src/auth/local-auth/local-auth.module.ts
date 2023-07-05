import { Module } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';

@Module({
  providers: [LocalAuthService],
  exports: [LocalAuthService],
})
export class LocalAuthModule { }
