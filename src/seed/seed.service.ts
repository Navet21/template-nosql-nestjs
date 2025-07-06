import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.schema';
import { UsersService } from 'src/users/users.service';
import { initialData } from './data/seed-data';
import { CreateUserDto } from 'src/auth/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly userService: UsersService
  ) {}
  async runSeed() {
    await this.userService.deleteAllUsers();
    await this.insertUsers()
    return 'Seed executed '
  }

  private async insertUsers(){
    const seedUsers = initialData.users
    const users: CreateUserDto[]= [];
    seedUsers.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, 10) 
      users.push(user)
    });
    console.log(users)
    await this.userModel.insertMany(users);
  }
}
