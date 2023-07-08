import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { EPermission } from '../enums/permission.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EPermission[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
