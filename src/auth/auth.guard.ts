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

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        // TODO:: เช็ค role or permission ณ ปัจจุบัน เอาสิ่งที่ได้จาก verifyToken มาเทียบกับ db ถ้ามีอะไรอัพเดทให้กลับไป login มาใหม่
        const user = await this.authService.verifyToken(token);
        ctx.user = user;
        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    } else {
      return false;
    }
  }
}
