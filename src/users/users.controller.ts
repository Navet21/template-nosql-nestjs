import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'src/auth/dto';
import { ParseMongoIdPipPipe } from 'src/common/pipes/parse-mongo-id-pip/parse-mongo-id-pip.pipe';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() queryParameters: PaginationDto) {
    return this.usersService.findAll(queryParameters);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipPipe) id: string) {
    return this.usersService.remove(id);
  }
}
