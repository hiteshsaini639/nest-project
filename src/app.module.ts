import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(config.mongoURI, { dbName: 'users' }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
