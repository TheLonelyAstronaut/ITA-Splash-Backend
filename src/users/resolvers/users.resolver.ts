import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { UserGraphQL } from '../models/user.graphql';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ArtistsService } from '../../artisits/services/artists.service';
import { UserOutput } from '../dto/outputs/user.output';

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService, private readonly artistsService: ArtistsService) {}

	@Query(() => UserOutput)
	@UseGuards(GqlAuthGuard)
	async getCurrentUser(@CurrentUser() parsedUser: UserGraphQL): Promise<UserOutput> {
		const user = await this.usersService.findById(parsedUser.id, ['subscriptions']);

		return {
			...user,
			subscriptions: user.subscriptions.map((artist) => artist.id),
		};
	}

	@Mutation(() => [Int])
	@UseGuards(GqlAuthGuard)
	async subscribe(@CurrentUser() parsedUser: UserGraphQL, @Args('data') artistID: number): Promise<number[]> {
		const artist = await this.artistsService.findByID(artistID);
		const subscriptions = await this.usersService.subscribe(parsedUser.id, artist);

		return subscriptions.map((artist) => artist.id);
	}
}
