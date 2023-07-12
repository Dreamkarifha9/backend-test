import { ObjectType, PickType } from '@nestjs/graphql';
import { Permission } from '../entities/permission.entity';

@ObjectType()
export class PermissionResponseDto extends PickType(Permission, [
  'id',
  'roleId',
  'featureId',
  'isUsed',
]) { }
