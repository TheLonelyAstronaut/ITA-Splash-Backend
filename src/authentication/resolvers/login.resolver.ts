import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../dto/inputs/login.input';
import { LoginOutput } from '../dto/outputs/login.output';
import { AuthenticationService } from '../services/authentication.service';

@Resolver()
export class LoginResolver {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Mutation(() => LoginOutput)
	async login(@Args('data') loginInput: LoginInput): Promise<LoginOutput> {
		await this.authenticationService.authenticate(loginInput);

		return {
			...loginInput,
			id: 1,
			username: 'bruh',
		};
	}
}
