import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from '../services/search.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { SearchInput } from '../dto/inputs/search.input';
import { SearchOutput } from '../dto/outputs/search.output';

@Resolver()
export class SearchResolver {
	constructor(private readonly searchService: SearchService) {}

	@Query(() => SearchOutput)
	@UseGuards(GqlAuthGuard)
	async findByQuery(@Args('data') data: SearchInput): Promise<SearchOutput> {
		return await this.searchService.findByQuery(data.query);
	}
}
