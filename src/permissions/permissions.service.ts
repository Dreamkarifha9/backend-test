import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionInput } from './dto/create-permission.input';
import { PermissionResponseDto } from './dto/permissions-response.dto';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permission } from './entities/permission.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class PermissionsService {
  private readonly logger: Logger = new Logger(PermissionsService.name);
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }
  async create(
    createPermissionInput: CreatePermissionInput[],
    createdBy: string,
  ): Promise<PermissionResponseDto[]> {
    const newMapPermission = [];
    for (const [key, value] of Object.entries(createPermissionInput)) {
      newMapPermission.push({
        id: uuid(),
        active: true,
        deleted: false,
        createdAt: new Date(),
        createdBy,
        updatedAt: new Date(),
        updatedBy: 'system',
        ...value,
      });
    }
    return await this.permissionRepository.save(newMapPermission);
  }

  getPermission() {
    return this.permissionRepository
      .createQueryBuilder('permissions')
      .select([
        'permissions.id',
        'permissions.userId',
        'permissions.featureId',
        'permissions.active',
        'permissions.deleted',
        'permissions.isUsed',
      ]);
  }

  async delete(roleId: string): Promise<boolean> {
    const userPermissions = await this.permissionRepository.find({
      where: { roleId },
    });
    if (userPermissions) {
      const ids = userPermissions.map((permissions) => permissions.id);
      await this.permissionRepository.delete(ids);
      return true;
    }

    return false;
  }
}
