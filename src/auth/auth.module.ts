import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';

import { LocalAuthModule } from './local-auth/local-auth.module';

@Module({
  imports: [LocalAuthModule],
  providers: [AuthResolver],
})
export class AuthModule { }
