import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { ValidRoles } from '../interfaces';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard)
  );
}
