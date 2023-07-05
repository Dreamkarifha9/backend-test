import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(AuthGuard.name);
  constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;
    this.logger.debug(
      `authorizationHeader user :: >> ${JSON.stringify(authorizationHeader)}`,
    );

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      this.logger.debug(`token user :: >> ${JSON.stringify(token)}`);
      try {
        const user = await this.authService.verifyToken(token);

        ctx.user = user;
        this.logger.debug(`authGuard user :: >> ${JSON.stringify(user)}`);
        return true;
      } catch (error) {
        this.logger.error(`authGuard user :: ${error}`);

        throw new UnauthorizedException();
      }
    } else {
      return false;
    }
  }
}
