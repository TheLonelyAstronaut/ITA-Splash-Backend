import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => String)
	async test(): Promise<string> {
		//await this.usersService.create();
		return '123';
	}
}
