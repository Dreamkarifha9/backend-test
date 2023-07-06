import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { PermissionsService } from './permissions.service';

@Injectable()
export class PermissionsValidationPipe implements PipeTransform {
  private readonly logger: Logger = new Logger(PermissionsValidationPipe.name);

  constructor(private readonly permissionsService: PermissionsService) { }

  async transform(dto: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      for (const [key, value] of Object.entries(dto)) {
        const { userId, featureId } = value as CreatePermissionInput;
        const permissionFound = await this.permissionsService
          .getPermission()
          .where('permissions.userId = :userId', {
            userId,
          })
          .andWhere('permissions.featureId = :featureId', {
            featureId,
          })
          .andWhere('permissions.active = :active', { active: true })
          .andWhere('permissions.deleted = :deleted', { deleted: false })
          .getOne();
        if (permissionFound)
          throw new ConflictException('Permission already exists.');
      }

      return dto;
    } else {
      return dto;
    }
  }
}
