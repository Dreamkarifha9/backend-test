import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { Permission } from './entities/permission.entity';
import { PermissionResponseDto } from './dto/permissions-response.dto';
import { PROTECTTO } from 'src/shared/decorators';
import { UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/auth/permissions.guard';
import { EUserPermission } from 'src/shared/enums';
import { PermissionsValidationPipe } from './permissions-validation.pipe';
@UseGuards(AuthGuard)
@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) { }

  @UseGuards(PermissionGuard)
  @PROTECTTO(EUserPermission.CREATE)
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
}
