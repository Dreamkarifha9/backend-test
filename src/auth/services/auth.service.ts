import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) { }

  async verifyToken(token: string): Promise<{ token: string }> {
    return this.jwtTokenService.verifyAsync(token);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.validatePassword(username, password);
    return user;
  }

  async generateUserCredentials(user: User) {
    console.log(`user ${JSON.stringify(user)}`);
    const payload = {
      email: user.email,
      username: user.username,
      role: user.role,
      permissions: user.role.permissions.map((item) => item.feature.slug),
      userId: user.id,
    };

    return {
      token: this.jwtTokenService.sign(payload),
    };
  }
}
