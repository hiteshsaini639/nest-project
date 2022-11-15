import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    //if user already exist
    const isUserExist = await this.userModel.findOne({ email: email });
    if (isUserExist) {
      throw new BadRequestException('User already exist');
    }

    return this.userModel.create({
      name: name,
      email: email,
      password: password,
    });
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
