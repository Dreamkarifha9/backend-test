import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserResponseDto extends PickType(User, [
  'id',
  'username',
  'email',
  'firstName',
  'lastName',
  'role',
  'permissions',
]) { }
