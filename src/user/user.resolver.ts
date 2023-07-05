import { Resolver, Query, Mutation, Args, PartialType } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserResponseDto, { name: 'createUser' })
  async createUser(
    @Args('input', {
      type: () => CreateUserInput,
    })
    createUserInput: CreateUserInput,
  ): Promise<UserResponseDto> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => UserResponseDto, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Query(() => [UserResponseDto], { name: 'users' })
  findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserResponseDto, { name: 'updateUser' })
  update(
    @Args('id') id: string,
    @Args('input', {
      type: () => UpdateUserInput,
    })
    updateUserInput: UpdateUserInput,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  delete(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
