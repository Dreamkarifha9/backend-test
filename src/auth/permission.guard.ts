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
export class PermissionGuard implements CanActivate {
  private readonly logger: Logger = new Logger(PermissionGuard.name);
  private PERMISSIONs_KEY: string;
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private readonly userService: UsersService,
  ) {
    this.PERMISSIONs_KEY = 'permissions';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.getAllAndOverride<string>(
      this.PERMISSIONs_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!permission) {
      return true;
    }

    const request = GqlExecutionContext.create(context).getContext();

    const { userId } = request && request['user'];

    const { permissions } = await this.userService.findById(userId);
    // this.logger.debug(`permissions ${JSON.stringify(permissions)}`);
    const hasRole = permissions.map(({ feature }) =>
      permission.includes(feature.slug),
    );
    if (hasRole.includes(true)) {
      return true;
    }
    return false;
  }
}
