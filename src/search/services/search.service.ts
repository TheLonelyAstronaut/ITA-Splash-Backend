import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../../tracks/models/track.model';
import { Like, Repository } from 'typeorm';
import { Album } from '../../albums/models/album.model';
import { Artist } from '../../artisits/models/artist.model';
import { SearchOutput } from '../dto/outputs/search.output';
import { toArtistOutput } from '../../artisits/mappers/to-artist-output.mapper';
import { toAlbumOutput } from '../../albums/mappers/to-album-output.mapper';
import { toTrackOutput } from '../../tracks/mappers/to-track-output.mapper';

@Injectable()
export class SearchService {
	constructor(
		@InjectRepository(Track) private tracksRepository: Repository<Track>,
		@InjectRepository(Album) private albumsRepository: Repository<Album>,
		@InjectRepository(Artist) private artistsRepository: Repository<Artist>
	) {}

	async findByQuery(query: string): Promise<SearchOutput> {
		const calculatedQuery = `%${query}%`;

		const artists = await this.artistsRepository.find({
			where: {
				name: Like(calculatedQuery),
			},
			relations: [],
		});

		const albums = await this.albumsRepository.find({
			where: {
				name: Like(calculatedQuery),
			},
			relations: [],
		});

		const tracks = await this.tracksRepository.find({
			where: {
				title: Like(calculatedQuery),
			},
			relations: ['album', 'album.artist'],
		});

		return {
			artists: toArtistOutput(artists),
			albums: toAlbumOutput(albums),
			tracks: toTrackOutput(tracks.filter((track) => !!track.album)),
		};
	}
}
