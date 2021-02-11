import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterOutput } from '../dto/outputs/register.output';
import { RegisterInput } from '../dto/inputs/register.input';
import { UsersService } from '../../users/services/users.service';
import { AuthenticationService } from '../services/authentication.service';
import { convertTypes } from '../../utils/mappers';
import { User } from '../../users/models/user.model';

@Resolver()
export class RegisterResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly authenticationService: AuthenticationService
	) {}

	@Mutation(() => RegisterOutput)
	async register(@Args('data') registerInput: RegisterInput): Promise<RegisterOutput> {
		await this.usersService.create(convertTypes<RegisterInput, User>(registerInput));
		return await this.authenticationService.authenticate(registerInput);
	}
}
