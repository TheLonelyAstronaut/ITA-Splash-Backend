import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { GqlAuthGuard } from '../security/guards/gql-auth-guard.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserOutput } from './dto/outputs/user.output';
import { Roles } from '../utils/roles/roles.decorators';
import { Role } from '../utils/roles/roles.enum';
import { RolesGuard } from '../utils/roles/roles.guard';
import { from, Observable } from 'rxjs';

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => UserOutput)
	@UseGuards(GqlAuthGuard)
	getCurrentUser(@CurrentUser() user: User): Observable<UserOutput> {
		return from(this.usersService.findById(user.id));
	}

	@Query(() => String)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async testAdminRole(): Promise<string> {
		return '123';
	}
}
