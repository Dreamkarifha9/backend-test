import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { UserResponseDto } from './dto/user-response.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from 'src/auth/services/auth.service';
@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
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

  async validatePassword(username: string, plainPassword: string) {
    username = username.toLowerCase();
    const user = await this.getJoinRoleAndPermissions()
      .where('users.username = :username', { username })
      .andWhere('users.active = :active', { active: true })
      .andWhere('users.deleted = :deleted', { deleted: false })
      .getOne();
    this.logger.debug(`user display ${JSON.stringify(user)}`);
    if (!user) {
      throw new NotFoundException('userNotFound');
    }
    const { password, ...others } = user;
    if (await bcrypt.compareSync(plainPassword, password)) {
      return others as User;
    }
    return null;
  }

  /**
   * Returns a user by given id
   */
  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.getJoinRoleAndPermissions()
      .where('users.id = :id', { id })
      .getOne();
    if (!user) throw new NotFoundException('userNotFound');
    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const foundUsers = await this.getJoinRoleAndPermissions().getMany();

    this.logger.debug(`display :: ${JSON.stringify(foundUsers)}`);
    return foundUsers;
  }

  private getJoinRoleAndPermissions() {
    return this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.email',
        'users.firstName',
        'users.lastName',
        'users.password',
      ])
      .leftJoin('users.userRole', 'userRole')
      .addSelect(['userRole.id', 'userRole.name'])
      .leftJoin('users.userPermissions', 'userPermissions')
      .addSelect(['userPermissions.userId', 'userPermissions.featureId'])
      .leftJoin('userPermissions.feature', 'feature')
      .addSelect(['feature.id', 'feature.name']);
  }

  async update(id: string, userDto: UpdateUserInput): Promise<UserResponseDto> {
    const foundUser = await this.findById(id);
    // todo: return userNotFound
    const mapUserDto = {
      ...foundUser,
      ...userDto,
    };
    this.logger.debug(`mapUserDto ${JSON.stringify(mapUserDto)}`);
    return await this.userRepository.save(mapUserDto);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    await this.userRepository.delete(id);
    return true;
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.username,
      loginUserInput.password,
    );
    this.logger.debug(`user loginUser display ${JSON.stringify(user)}`);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return this.authService.generateUserCredentials(user);
    }
  }
}
