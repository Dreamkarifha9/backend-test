import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Resolver('Permission')
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Mutation('createPermission')
  create(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionsService.create(createPermissionInput);
  }

  @Query('permissions')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Query('permission')
  findOne(@Args('id') id: number) {
    return this.permissionsService.findOne(id);
  }

  @Mutation('updatePermission')
  update(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ) {
    return this.permissionsService.update(
      updatePermissionInput.id,
      updatePermissionInput,
    );
  }

  @Mutation('removePermission')
  remove(@Args('id') id: number) {
    return this.permissionsService.remove(id);
  }
}
