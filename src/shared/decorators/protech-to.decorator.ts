/* eslint-disable @typescript-eslint/ban-types */

import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { RolesGuard } from 'src/auth/roles.guard';
import { EPermission } from '../enums';
import { Roles } from './roles.decorator';

/**
 * Decorator that sets all the protect roles and it guards
 *
 * @param roles stores the roles allowed to do something
 */
export function ProtectTo(
  ...roles: EPermission[]
): <TFunction extends Function, Y>(
  target: unknown | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
