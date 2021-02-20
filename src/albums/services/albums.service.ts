import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../models/album.model';
import { Track } from '../../tracks/models/track.model';
import { Artist } from '../../artisits/models/artist.model';
import { AddAlbumInput } from '../dto/inputs/add-album.input';

@Injectable()
export class AlbumsService {
	constructor(@InjectRepository(Album) private albumRepository: Repository<Album>) {}

	async create(artist: Artist, tracks: Track[], albumInfo: AddAlbumInput): Promise<Album> {
		const album = new Album();
		album.tracks = tracks;
		album.name = albumInfo.name;
		album.artwork = albumInfo.image;
		album.artist = artist;

		await this.albumRepository.save(album);
		return album;
	}
}
