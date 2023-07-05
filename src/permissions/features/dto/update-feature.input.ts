import { CreateFeatureInput } from './create-feature.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFeatureInput extends PartialType(CreateFeatureInput) {
  id: number;
}
