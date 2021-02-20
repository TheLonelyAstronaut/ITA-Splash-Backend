import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../models/artist.model';
import { Repository } from 'typeorm';
import { AddArtistInput } from '../dto/inputs/add-artist.input';
import { ArtistOutput } from '../dto/outputs/artist.output';

@Injectable()
export class ArtistsService {
	constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>) {}

	async create(artistInput: AddArtistInput): Promise<Artist> {
		const artist = new Artist();
		artist.image = artistInput.image;
		artist.name = artistInput.name;
		artist.similarArtists = [];
		artist.albums = [];

		await this.artistRepository.save(artist);
		return artist;
	}

	async findByID(id: number, includeNullable?: boolean): Promise<Artist> {
		return await this.artistRepository.findOneOrFail({
			where: {
				id,
			},
			relations: includeNullable ? ['similarArtists', 'albums'] : [],
		});
	}

	async addSimilarArtist(artistID: number, similarArtistID: number): Promise<ArtistOutput> {
		const artist = await this.findByID(artistID, true);

		const similarArtist = await this.findByID(similarArtistID);

		if (!artist.similarArtists) {
			artist.similarArtists = [similarArtist];
		} else {
			artist.similarArtists = [...artist.similarArtists, similarArtist];
		}

		await this.artistRepository.save(artist);

		return {
			...artist,
			albums: [],
		};
	}

	async getSubscribers(artistID: number): Promise<void> {
		console.log('get subs');
	}
}
