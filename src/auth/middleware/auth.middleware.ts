import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(AuthMiddleware.name);
  constructor(private authService: AuthService) { }

  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;

    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      user = await this.authService.verifyToken(accessToken);
    } catch (error) {
      throw new UnauthorizedException();
    }

    if (user) {
      req['user'] = user;
    }
    next();
  }
}
