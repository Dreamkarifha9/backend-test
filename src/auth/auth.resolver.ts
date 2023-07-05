import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LocalLoginDto } from './local-auth/dto/local-login.dto';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { LocalAuthService } from './local-auth/local-auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly localAuthService: LocalAuthService) { }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LocalLoginDto, { name: 'login' })
  async login(
    @Args('input', {
      type: () => LocalLoginDto,
    })
    localLoginDto: LocalLoginDto,
  ): Promise<any> {
    return null;
  }
}
