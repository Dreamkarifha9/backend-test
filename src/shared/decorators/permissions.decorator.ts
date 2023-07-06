import { SetMetadata } from '@nestjs/common';
import { EUserPermission } from '../enums/permission.enum';

export const ROLES_KEY = 'roles';
export const PROTECTTO = (...roles: EUserPermission[]) =>
  SetMetadata(ROLES_KEY, roles);
