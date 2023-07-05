import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  create(createUserInput: CreateUserInput): Promise<User> {
    this.logger.debug(`createUserInput ${JSON.stringify(createUserInput)}`);
    return null;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
