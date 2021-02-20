import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/models/album.model';

@Entity()
export class Track {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	url: string;

	@ManyToOne(() => Album, (album) => album.tracks)
	album: Album;
}
