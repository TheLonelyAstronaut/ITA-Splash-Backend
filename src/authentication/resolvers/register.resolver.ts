import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterOutput } from '../dto/outputs/register.output';
import { RegisterInput } from '../dto/inputs/register.input';
import { UsersService } from '../../users/services/users.service';
import { AuthenticationService } from '../services/authentication.service';
import { convertTypes } from '../../utils/mappers';
import { UserGraphQL } from '../../users/models/user.graphql';
import { PlaylistsService } from '../../playlists/services/playlists.service';

@Resolver()
export class RegisterResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly authenticationService: AuthenticationService,
		private readonly playlistsService: PlaylistsService
	) {}

	@Mutation(() => RegisterOutput)
	async register(@Args('data') registerInput: RegisterInput): Promise<RegisterOutput> {
		const user = await this.usersService.create(convertTypes<RegisterInput, UserGraphQL>(registerInput));
		await this.playlistsService.create(user, { name: 'Liked Songs' }, true);

		return await this.authenticationService.authenticate(registerInput);
	}
}
