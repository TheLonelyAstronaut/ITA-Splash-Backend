import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
import { toTrackOutput } from '../mappers/to-track-input.mapper';
import { NotificationsService } from '../../firebase/notifications/services/notifications.service';
import { fromMultidimensional } from '../../utils/mappers';
import { toNotification } from '../../firebase/notifications/mappers/mappers';
import { getFCMTokens } from '../../artisits/mappers/mappers';

@Resolver()
export class AlbumsResolver {
	constructor(
		private readonly albumsService: AlbumsService,
		private readonly artistsService: ArtistsService,
		private readonly tracksService: TracksService,
		private readonly notificationsService: NotificationsService
	) {}

	@Mutation(() => AlbumOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addAlbum(@Args('data') data: AddAlbumInput): Promise<AlbumOutput> {
		const artist: Artist = await this.artistsService.findByID(data.artistID, [
			'subscribers',
			'subscribers.FCMTokens',
		]);
		const tracks: Track[] = await this.tracksService.findByID(data.tracks, true);
		const album = await this.albumsService.create(artist, tracks, data);
		album.tracks = await this.tracksService.findByID(data.tracks, true);

		await this.notificationsService.sendNotification({
			receivers: getFCMTokens(artist),
			notification: toNotification(artist, album),
		});

		return {
			...album,
			tracks: toTrackOutput(album.tracks),
		};
	}
}
