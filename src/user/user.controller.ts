import { Controller, Post, Body } from '@nestjs/common';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      name,
      email,
      hashedPassword,
    );
    return result;
  }
}
