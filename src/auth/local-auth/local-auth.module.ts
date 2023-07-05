import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { LocalAuthService } from './local-auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    forwardRef(() => UserModule),
  ],
  providers: [LocalAuthService, LocalStrategy],
  exports: [LocalAuthService, LocalStrategy],
})
export class LocalAuthModule { }
