import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { LoggedUserOutput } from './dto/login-user.output';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './../auth/auth.guard';
import { PROTECTTO } from 'src/shared/decorators';
import { EUserPermission } from 'src/shared/enums';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => UserResponseDto, { name: 'createUser' })
  async createUser(
    @Args('input', {
      type: () => CreateUserInput,
    })
    createUserInput: CreateUserInput,
  ): Promise<UserResponseDto> {
    return await this.usersService.create(createUserInput);
  }

  @PROTECTTO(EUserPermission.READ)
  @Query(() => UserResponseDto, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @PROTECTTO(EUserPermission.READ)
  @Query(() => [UserResponseDto], { name: 'users' })
  findAll(@Context('user') user: any): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @PROTECTTO(EUserPermission.UPDATE)
  @Mutation(() => UserResponseDto, { name: 'updateUser' })
  update(
    @Args('id') id: string,
    @Args('input', {
      type: () => UpdateUserInput,
    })
    updateUserInput: UpdateUserInput,
  ): Promise<UserResponseDto> {
    console.log('sds');
    return this.usersService.update(id, updateUserInput);
  }

  @PROTECTTO(EUserPermission.DELETE)
  @Mutation(() => Boolean, { name: 'deleteUser' })
  delete(@Args('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
  }
}
