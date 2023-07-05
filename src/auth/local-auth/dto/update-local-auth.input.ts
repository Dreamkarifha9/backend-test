import { CreateLocalAuthInput } from './create-local-auth.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLocalAuthInput extends PartialType(CreateLocalAuthInput) {
  id: number;
}
