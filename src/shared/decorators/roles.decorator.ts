import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ERoles } from '../enums/permission.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERoles[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
