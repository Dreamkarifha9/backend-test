import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger: Logger = new Logger(RolesGuard.name);
  private ROLES_KEY: string;
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private readonly userService: UsersService,
  ) {
    this.ROLES_KEY = 'roles';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string>(this.ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const request = GqlExecutionContext.create(context).getContext();

    const { permissions } = request && request['user'];
    this.logger.debug(`permissions ${permissions}`);
    const hasRole = permissions.map((permissions) =>
      roles.includes(permissions),
    );
    if (hasRole.includes(true)) {
      return true;
    }
    return false;
  }
}
