import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../models/track.model';
import { Repository } from 'typeorm';
import { AddTrackInput } from '../dto/inputs/add-track.input';

@Injectable()
export class TracksService {
	constructor(@InjectRepository(Track) private tracksRepository: Repository<Track>) {}

	async create(data: AddTrackInput): Promise<Track> {
		const track = new Track();
		track.url = data.url;
		track.title = data.title;

		await this.tracksRepository.save(track);
		return track;
	}

	async findByID(ids: number[]): Promise<Track[]> {
		return await this.tracksRepository.find({
			where: {
				id: ids,
			},
		});
	}
}
