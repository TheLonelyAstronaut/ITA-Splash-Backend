import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../models/track.model';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
	constructor(@InjectRepository(Track) private tracksRepository: Repository<Track>) {}

	async addTrack(): Promise<void> {
		//do something
	}
}
