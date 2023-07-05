import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';
import { FeaturesModule } from './features/features.module';

@Module({
  providers: [PermissionsResolver, PermissionsService],
  imports: [FeaturesModule]
})
export class PermissionsModule {}
