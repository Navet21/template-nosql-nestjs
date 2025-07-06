import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/auth/dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  //Create User by Admin
  async create(createUserDto: CreateUserDto) {
    // TODO: Encriptar pass cuando haga auth.
    createUserDto.email = createUserDto.email.toLowerCase();

    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error: any) {
      console.error(error);
      throw new InternalServerErrorException(
        `Can't create User - Check server logs`,
      );
    }
  }

  //Find all Users Paginated
  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto;
    const users = await this.userModel
      .find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
    return users;
  }

  //Find User by email or id
  async findOne(term: string) {
    let user: User | null = null;
    //MongoId
    if (!user && isValidObjectId(term)) {
      user = await this.userModel.findById(term);
    }
    //Email
    if (!user) {
      user = await this.userModel.findOne({ email: term.toLowerCase().trim() });
    }
    if (!user) {
      throw new NotFoundException(`User with id or email ${term} not found`);
    }
    return user;
  }

  //Update User
  async update(term: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(term);
      if (updateUserDto.email)
        updateUserDto.email = updateUserDto.email.toLocaleLowerCase();
      await user.updateOne(updateUserDto);
      return { ...user.toJSON(), ...updateUserDto };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create User - Check server logs`,
      );
    }
  }

  //Delete User
  async remove(id: string) {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    return `User with id ${id} successfully deleted.`;
  }
}
