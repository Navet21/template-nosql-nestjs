import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    const { password, ...userData } = createUserDto;
    try {
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      return {
        user,
        token: this.getJWtToken({ uuid: user.uuid }),
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Check server logs');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password } = loginUserDto;
    const email = loginUserDto.email.toLowerCase();
    const user = await this.userModel
      .findOne({ email: email })
      .select('email password uuid')
      .exec();

    if (!user) {
      throw new UnauthorizedException(`Credentials are not valid (email)`);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Credentials are not valid (password)`);
    }
    return {
      user,
      token: this.getJWtToken({ uuid: user.uuid }),
    };
  }

  async checkAuthStatus(user: User){
    return{
      user,
      token: this.getJWtToken({uuid : user.uuid})
    }
  }

  //TOKEN
  private getJWtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
