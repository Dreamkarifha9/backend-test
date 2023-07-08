import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { Permission } from './entities/permission.entity';
import { PermissionResponseDto } from './dto/permissions-response.dto';

import { UsePipes } from '@nestjs/common';

import { EPermission } from 'src/shared/enums';
import { PermissionsValidationPipe } from './permissions-validation.pipe';
import { ProtectTo } from 'src/shared/decorators/protech-to.decorator';
@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) { }

  @ProtectTo(EPermission.CREATE)
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

  @ProtectTo(EPermission.DELETE)
  @Mutation(() => Boolean, { name: 'deletePermission' })
  delete(@Args('userId') userId: string): Promise<boolean> {
    return this.permissionsService.delete(userId);
  }
}
