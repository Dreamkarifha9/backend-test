import { Resolver } from '@nestjs/graphql';
import { LocalAuthService } from './local-auth/local-auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly localAuthService: LocalAuthService) { }
}
