import { Module } from '@nestjs/common';

import { AuthResolver } from './auth.resolver';
import { LocalAuthModule } from './local-auth/local-auth.module';

@Module({
  providers: [AuthResolver],
  imports: [LocalAuthModule],
})
export class AuthModule { }
