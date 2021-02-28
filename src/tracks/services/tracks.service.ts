import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../models/track.model';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
	constructor(@InjectRepository(Track) private tracksRepository: Repository<Track>) {}

	async create(title: string, url: string): Promise<Track> {
		const track = new Track();
		track.url = url;
		track.title = title;

		await this.tracksRepository.save(track);
		return track;
	}

	async findByID(id: number, relations?: string[]): Promise<Track> {
		return await this.tracksRepository.findOneOrFail({
			where: {
				id,
			},
			relations,
		});
	}

	async findMultipleByID(ids: number[], relations?: string[]): Promise<Track[]> {
		return await this.tracksRepository.find({
			where: ids.map((id) => ({ id })),
			relations,
		});
	}
}
