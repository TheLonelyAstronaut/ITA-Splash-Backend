import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../utils/roles/roles.decorators';
import { Role } from '../../utils/roles/roles.enum';
import { RolesGuard } from '../../utils/roles/roles.guard';
import { ArtistsService } from '../services/artists.service';
import { AddArtistInput } from '../dto/inputs/add-artist.input';
import { ArtistOutput } from '../dto/outputs/artist.output';
import { AddSimilarArtistInput } from '../dto/inputs/add-similar-artist.input';
import { GetArtistInput } from '../dto/inputs/get-artist.input';
import { toAlbumOutput } from '../../albums/mappers/to-album-output.mapper';

@Resolver()
export class ArtistsResolver {
	constructor(private readonly artistsService: ArtistsService) {}

	@Mutation(() => ArtistOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addArtist(@Args('data') artist: AddArtistInput): Promise<ArtistOutput> {
		return await this.artistsService.create(artist);
	}

	@Mutation(() => ArtistOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addSimilarArtist(@Args('data') data: AddSimilarArtistInput): Promise<ArtistOutput> {
		return await this.artistsService.addSimilarArtist(data.artistID, data.similarArtistID);
	}

	@Query(() => ArtistOutput)
	@UseGuards(GqlAuthGuard)
	async getArtist(@Args('data') data: GetArtistInput): Promise<ArtistOutput> {
		const output = await this.artistsService.findByID(data.id, [
			'similarArtists',
			'albums',
			'albums.tracks',
			'albums.artist',
		]);

		return {
			...output,
			albums: output.albums.map(toAlbumOutput),
		};
	}
}
