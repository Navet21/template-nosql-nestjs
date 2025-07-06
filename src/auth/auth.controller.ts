import { Controller, Post, Body, UseGuards, Get, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.schema';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  //Ruta de prueba
  @Get('private')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  testingPrivateRoute(@GetUser() user: User) {
    return {
      ok: true,
      user
    };
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User){
    return this.authService.checkAuthStatus(user);
  }
}
