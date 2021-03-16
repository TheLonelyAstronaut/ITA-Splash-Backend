import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlbumsService } from '../services/albums.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { RolesGuard } from '../../utils/roles/roles.guard';
import { Roles } from '../../utils/roles/roles.decorators';
import { Role } from '../../utils/roles/roles.enum';
import { AddAlbumInput } from '../dto/inputs/add-album.input';
import { AlbumOutput } from '../dto/outputs/album.output';
import { ArtistsService } from '../../artisits/services/artists.service';
import { Artist } from '../../artisits/models/artist.model';
import { Track } from '../../tracks/models/track.model';
import { TracksService } from '../../tracks/services/tracks.service';
import { NotificationsService } from '../../firebase/notifications/services/notifications.service';
import { toNotification } from '../../firebase/notifications/mappers/mappers';
import { getFCMTokens } from '../../artisits/mappers/mappers';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { UserGraphQL } from '../../users/models/user.graphql';
import { toAlbumOutput } from '../mappers/to-album-output.mapper';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { AWSS3Provider } from '../../aws-s3/providers/aws-s3.provider';
import { UsersService } from '../../users/services/users.service';

@Resolver()
export class AlbumsResolver {
	constructor(
		private readonly albumsService: AlbumsService,
		private readonly artistsService: ArtistsService,
		private readonly tracksService: TracksService,
		private readonly notificationsService: NotificationsService,
		private readonly uploadProvider: AWSS3Provider,
		private readonly usersService: UsersService
	) {}

	@Mutation(() => AlbumOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addAlbum(
		@CurrentUser() parsedUser: UserGraphQL,
		@Args('data') data: AddAlbumInput,
		@Args('file', { type: () => GraphQLUpload }) file: Promise<FileUpload>
	): Promise<AlbumOutput> {
		const artist: Artist = await this.artistsService.findByID(data.artistID, [
			'subscribers',
			'subscribers.FCMTokens',
		]);
		const tracks: Track[] = await this.tracksService.findMultipleByID(data.tracks, ['album', 'album.artist']);

		const toUpload = await file;

		const output = await this.uploadProvider.uploadFile({
			...toUpload,
			path: `${Date.now().toString()}`,
		});

		const album = await this.albumsService.create(artist, tracks, data, output.url);
		album.tracks = await this.tracksService.findMultipleByID(data.tracks, ['album', 'album.artist']);

		await this.notificationsService.sendNotification({
			receivers: getFCMTokens(artist),
			...toNotification(artist, album),
		});

		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toAlbumOutput(album, likedID);
	}

	@Query(() => AlbumOutput)
	@UseGuards(GqlAuthGuard)
	async getAlbum(@CurrentUser() parsedUser: UserGraphQL, @Args('data') albumID: number): Promise<AlbumOutput> {
		const album = await this.albumsService.findByID(albumID, ['artist', 'tracks', 'tracks.album']);

		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toAlbumOutput(album, likedID);
	}
}
