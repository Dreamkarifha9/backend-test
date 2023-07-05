import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalAuthService {
  constructor(private readonly usersService: UserService) { }

  async validateUser(username: string, password: string) {
    const foundUser = await this.usersService.validatePassword(
      username,
      password,
    );
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
}
