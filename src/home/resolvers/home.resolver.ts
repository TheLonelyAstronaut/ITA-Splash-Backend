import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { HomeService } from '../services/home.service';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { UserGraphQL } from '../../users/models/user.graphql';
import { UsersService } from '../../users/services/users.service';
import { HomepageDataOutput } from '../dto/outputs/homepage-data.output';

@Resolver()
export class HomeResolver {
	constructor(private readonly homeService: HomeService, private readonly usersService: UsersService) {}

	@Query(() => [HomepageDataOutput])
	@UseGuards(GqlAuthGuard)
	async getHomepage(@CurrentUser() parsedUser: UserGraphQL): Promise<HomepageDataOutput[]> {
		const user = await this.usersService.findById(parsedUser.id, [
			'playlists',
			'playlists.tracks',
			'playlists.tracks.album',
			'playlists.tracks.album.artist',
			'subscriptions',
			'subscriptions.albums',
		]);

		return await this.homeService.getHomepage(user);
	}
}
