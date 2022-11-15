import { Controller, Post, Body, Logger } from '@nestjs/common';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger();

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

    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent(result.name, result.email),
    );
    return result;
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: UserCreatedEvent) {
    this.logger.verbose('Welcoming new user...', payload.name);
  }

  @OnEvent('user.created')
  SendingWelcomeEmail(payload: UserCreatedEvent) {
    this.logger.verbose('Sending welcoming email...', payload.email);
  }

  @OnEvent('user.created')
  SendingWelcomeGift(payload: UserCreatedEvent) {
    this.logger.verbose('Sending Gift...');
  }
}
