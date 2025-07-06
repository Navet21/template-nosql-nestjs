import { PassportStrategy } from '@nestjs/passport';
import { User } from '../entities/user.schema';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET')!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { uuid } = payload;

    const user = await this.userModel.findOne({ uuid: uuid });

    if (!user) {
      throw new UnauthorizedException('Token is not valid');
    }

    if (!user.IsActive) {
      throw new UnauthorizedException('User is inactive, talk with an admin');
    }
    return user;
  }
}
