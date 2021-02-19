import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	artist: string;

	@Column()
	artwork: string;
}
