import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../tracks/models/track.model';
import { Artist } from '../../artisits/models/artist.model';

@Entity()
export class Album {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	artwork: string;

	@Column()
	name: string;

	@OneToMany(() => Track, (track) => track.album)
	tracks: Track[];

	@ManyToOne(() => Artist, (artist) => artist.albums)
	artist: Artist;
}
