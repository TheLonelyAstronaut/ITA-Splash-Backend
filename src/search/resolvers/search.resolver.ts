import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from '../services/search.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { SearchInput } from '../dto/inputs/search.input';
import { SearchOutput } from '../dto/outputs/search.output';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { UserGraphQL } from '../../users/models/user.graphql';
import { UsersService } from '../../users/services/users.service';

@Resolver()
export class SearchResolver {
	constructor(private readonly searchService: SearchService, private readonly usersService: UsersService) {}

	@Query(() => SearchOutput)
	@UseGuards(GqlAuthGuard)
	async findByQuery(@CurrentUser() parsedUser: UserGraphQL, @Args('data') data: SearchInput): Promise<SearchOutput> {
		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);

		return await this.searchService.findByQuery(data.query, user);
	}
}
