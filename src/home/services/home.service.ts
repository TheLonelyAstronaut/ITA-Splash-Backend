import { Injectable } from '@nestjs/common';
import { User } from '../../users/models/user.model';
import { HomepageDataOutput } from '../dto/outputs/homepage-data.output';
import { toArtistOutput } from '../../artisits/mappers/to-artist-output.mapper';
import { toPlaylistOutput } from '../../playlists/mappers/to-playlist-output.mapper';
import { fromMultidimensional } from '../../utils/mappers';
import { toAlbumOutput } from '../../albums/mappers/to-album-output.mapper';

@Injectable()
export class HomeService {
	async getHomepage(user: User): Promise<HomepageDataOutput[]> {
		const artists = user.subscriptions;
		const playlists = user.playlists;
		const albums = fromMultidimensional(user.subscriptions.map((artist) => artist.albums));

		return [
			{
				title: 'Artists you love',
				data: toArtistOutput(artists),
			},
			{
				title: 'Checkout your music',
				data: toPlaylistOutput(playlists),
			},
			{
				title: 'Albums from your artists',
				data: toAlbumOutput(albums),
			},
		];
	}
}
