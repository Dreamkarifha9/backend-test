import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { UserResponseDto } from './dto/user-response.dto';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(userDto: CreateUserInput): Promise<UserResponseDto> {
    this.logger.verbose(`userDto ${JSON.stringify(userDto)}`);
    const user: User = {
      id: uuid(),
      active: true,
      deleted: false,
      createdAt: new Date(),
      createdBy: 'system',
      updatedAt: new Date(),
      updatedBy: 'system',
      ...userDto,
    };
    const newUser = this.userRepository.create(user);
    const createdUser = await this.userRepository.save(newUser);
    this.logger.debug(`createdUser ${JSON.stringify(createdUser)}`);

    return this.findById(createdUser.id);
  }

  /**
   * Returns a user by given id
   */
  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.username',
        'users.firstName',
        'users.lastName',
        'users.email',
      ])
      .where('users.id = :id', { id })
      .getOne();
    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const foundUsers = await this.userRepository.find();
    return foundUsers;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
