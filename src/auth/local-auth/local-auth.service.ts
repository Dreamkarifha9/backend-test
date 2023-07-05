import { Injectable } from '@nestjs/common';
import { CreateLocalAuthInput } from './dto/create-local-auth.input';
import { UpdateLocalAuthInput } from './dto/update-local-auth.input';

@Injectable()
export class LocalAuthService {
  create(createLocalAuthInput: CreateLocalAuthInput) {
    return 'This action adds a new localAuth';
  }

  findAll() {
    return `This action returns all localAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localAuth`;
  }

  update(id: number, updateLocalAuthInput: UpdateLocalAuthInput) {
    return `This action updates a #${id} localAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} localAuth`;
  }
}
