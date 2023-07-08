import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { Permission } from './entities/permission.entity';
import { PermissionResponseDto } from './dto/permissions-response.dto';

import { UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { ERoles } from 'src/shared/enums';
import { PermissionsValidationPipe } from './permissions-validation.pipe';
import { ProtectTo } from 'src/shared/decorators/protech-to.decorator';
@UseGuards(AuthGuard)
@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) { }

  @ProtectTo(ERoles.CREATE)
  @UsePipes(PermissionsValidationPipe)
  @Mutation(() => [PermissionResponseDto], { name: 'createPermissions' })
  create(
    @Args('input', {
      type: () => [CreatePermissionInput],
    })
    createPermissionInput: CreatePermissionInput[],
    @Context('user') user: any,
  ) {
    const { username } = user;
    return this.permissionsService.create(createPermissionInput, username);
  }

  @ProtectTo(ERoles.DELETE)
  @Mutation(() => Boolean, { name: 'deletePermission' })
  delete(@Args('userId') userId: string): Promise<boolean> {
    return this.permissionsService.delete(userId);
  }
}
