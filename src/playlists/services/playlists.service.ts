import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../models/playlist.model';
import { CreatePlaylistInput } from '../dto/inputs/create-playlist.input';
import { User } from '../../users/models/user.model';
import { Track } from '../../tracks/models/track.model';

@Injectable()
export class PlaylistsService {
	constructor(@InjectRepository(Playlist) private playlistRepository: Repository<Playlist>) {}

	async create(user: User, input: CreatePlaylistInput, liked?: boolean): Promise<Playlist> {
		const playlist = new Playlist();
		playlist.name = input.name;
		playlist.owner = user;
		playlist.tracks = [];

		if (liked) {
			playlist.liked = liked;
		}

		await this.playlistRepository.save(playlist);
		return playlist;
	}

	async addOrRemoveFromPlaylist(track: Track, playlistID: number): Promise<Playlist> {
		const playlist = await this.findByID(playlistID, ['tracks', 'tracks.album', 'tracks.album.artist']);

		const index = playlist.tracks.findIndex((includedTrack) => track.id === includedTrack.id);

		if (index >= 0) {
			playlist.tracks.splice(index, 1);
		} else {
			playlist.tracks.unshift(track);
		}

		await this.playlistRepository.save(playlist);
		return playlist;
	}

	async findByID(id: number, relations?: string[]): Promise<Playlist> {
		return await this.playlistRepository.findOneOrFail({
			where: {
				id,
			},
			relations,
		});
	}
}
