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

		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return [
			{
				title: 'Artists you love',
				data: toArtistOutput(artists, likedID),
			},
			{
				title: 'Checkout your music',
				data: toPlaylistOutput(playlists, likedID),
			},
			{
				title: 'Albums from your artists',
				data: toAlbumOutput(albums, likedID),
			},
		];
	}
}
