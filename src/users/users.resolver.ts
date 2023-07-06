import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { LoggedUserOutput } from './dto/login-user.output';
import { LoginUserInput } from './dto/login-user.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PROTECTTO } from './../shared/decorators';
import { EUserPermission } from 'src/shared/enums';
import { PermissionGuard } from 'src/permissions/permissions.guard';
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

  @Query(() => UserResponseDto, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard, AuthGuard, PermissionGuard)
  @PROTECTTO(EUserPermission.READ)
  @Query(() => [UserResponseDto], { name: 'users' })
  findAll(@Context('user') user: any): Promise<UserResponseDto[]> {
    console.log('findAll user ', JSON.stringify(user));
    return this.usersService.findAll();
  }

  @Mutation(() => UserResponseDto, { name: 'updateUser' })
  update(
    @Args('id') id: string,
    @Args('input', {
      type: () => UpdateUserInput,
    })
    updateUserInput: UpdateUserInput,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  delete(@Args('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
  }
}
