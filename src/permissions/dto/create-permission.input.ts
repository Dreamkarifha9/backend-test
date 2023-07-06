import { InputType } from '@nestjs/graphql';
import { PermissionDto } from './permission.dto';
@InputType()
export class CreatePermissionInput extends PermissionDto { }
