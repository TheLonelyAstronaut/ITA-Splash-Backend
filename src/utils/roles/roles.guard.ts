import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context);

		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);

		if (!requiredRoles) {
			return true;
		}

		const { user }: { user: User } = ctx.getContext().req;

		return requiredRoles.some((role) => user.role == role);
	}
}
