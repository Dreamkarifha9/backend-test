import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { EPermission } from '../enums/permission.enum';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...roles: EPermission[]): CustomDecorator =>
  SetMetadata(PERMISSIONS_KEY, roles);
