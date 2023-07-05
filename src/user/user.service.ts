import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(usercreateUserInput: CreateUserInput): Promise<User> {
    this.logger.verbose(
      `createUserInput ${JSON.stringify(usercreateUserInput)}`,
    );
    const user: User = {
      id: uuid(),
      active: true,
      deleted: false,
      createdAt: new Date(),
      createdBy: 'system',
      updatedAt: new Date(),
      updatedBy: 'system',
      ...usercreateUserInput,
    };
    const newUser = this.userRepository.create(user);
    const createUser = await this.userRepository.save(newUser);
    this.logger.debug(`createUser ${JSON.stringify(createUser)}`);

    return createUser;
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
