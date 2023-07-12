import { ForbiddenException } from '@nestjs/common';
import { FieldMiddleware, NextFn } from '@nestjs/graphql';

export const checkRoleMiddleware: FieldMiddleware = async (
  ctx,
  next: NextFn,
) => {
  const { info, context } = ctx;
  const { user } = context;
  const { extensions } = info.parentType.getFields()[info.fieldName];
  console.log(`user ${user}`);
  if (user === undefined) return next();
  const userRole = user.role.name;

  /**
   * In a real-world application, the "userRole" variable
   * should represent the caller's (user) role (for example, "ctx.user.role").
   */

  if (!userRole.includes(extensions.role)) {
    // or just "return null" to ignore
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${info.fieldName}" field.`,
    );
  }
  return next();
};
