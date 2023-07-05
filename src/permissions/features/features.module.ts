import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesResolver } from './features.resolver';

@Module({
  providers: [FeaturesResolver, FeaturesService]
})
export class FeaturesModule {}
