import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../models/artist.model';
import { Repository } from 'typeorm';
import { AddArtistInput } from '../dto/inputs/add-artist.input';
import { ArtistOutput } from '../dto/outputs/artist.output';

@Injectable()
export class ArtistsService {
	constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>) {}

	async create(name: string, image: string): Promise<Artist> {
		const artist = new Artist();
		artist.image = image;
		artist.name = name;
		artist.similarArtists = [];
		artist.albums = [];
		artist.subscribers = [];

		await this.artistRepository.save(artist);
		return artist;
	}

	async findByID(id: number, relations?: string[]): Promise<Artist> {
		return await this.artistRepository.findOneOrFail({
			where: {
				id,
			},
			relations,
		});
	}

	async addSimilarArtist(artistID: number, similarArtistID: number): Promise<ArtistOutput> {
		const artist = await this.findByID(artistID, ['similarArtists', 'albums', 'albums.tracks']);

		const similarArtist = await this.findByID(similarArtistID);

		artist.similarArtists = [...artist.similarArtists, similarArtist];

		await this.artistRepository.save(artist);

		return artist;
	}
}
