import { Injectable, Logger } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { LocalAuthService } from './local-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(LocalStrategy.name);
  constructor(private readonly localAuthService: LocalAuthService) {
    super({ usernameField: 'username', passReqToCallback: true });
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.debug(`Validating user ${username}} password :: ${password}`);
    return await this.localAuthService.validateUser(username, password);
  }
}
