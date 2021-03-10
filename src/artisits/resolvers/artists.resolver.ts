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
import { toArtistOutput } from '../mappers/to-artist-output.mapper';
import { AWSS3Provider } from '../../aws-s3/providers/aws-s3.provider';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UsersService } from '../../users/services/users.service';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { UserGraphQL } from '../../users/models/user.graphql';

@Resolver()
export class ArtistsResolver {
	constructor(
		private readonly artistsService: ArtistsService,
		private readonly uploadProvider: AWSS3Provider,
		private readonly usersService: UsersService
	) {}

	@Mutation(() => ArtistOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addArtist(
		@CurrentUser() parsedUser: UserGraphQL,
		@Args('data') artist: AddArtistInput,
		@Args('file', { type: () => GraphQLUpload }) file: Promise<FileUpload>
	): Promise<ArtistOutput> {
		const toUpload = await file;

		const output = await this.uploadProvider.uploadFile({
			...toUpload,
			path: `${Date.now().toString()}`,
		});

		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toArtistOutput(await this.artistsService.create(artist.name, output.url), likedID);
	}

	@Mutation(() => ArtistOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addSimilarArtist(
		@CurrentUser() parsedUser: UserGraphQL,
		@Args('data') data: AddSimilarArtistInput
	): Promise<ArtistOutput> {
		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toArtistOutput(await this.artistsService.addSimilarArtist(data.artistID, data.similarArtistID), likedID);
	}

	@Query(() => ArtistOutput)
	@UseGuards(GqlAuthGuard)
	async getArtist(@CurrentUser() parsedUser: UserGraphQL, @Args('data') data: GetArtistInput): Promise<ArtistOutput> {
		const output = await this.artistsService.findByID(data.id, [
			'similarArtists',
			'albums',
			'albums.tracks',
			'albums.artist',
			'subscribers',
		]);

		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toArtistOutput(output, likedID);
	}
}
