import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../tracks/models/track.model';
import { User } from '../../users/models/user.model';

@Entity()
export class Playlist {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column('boolean', { default: false })
	liked: boolean;

	@ManyToMany(() => Track, (track) => track.album)
	@JoinTable()
	tracks: Track[];

	@ManyToOne(() => User, (user) => user.playlists)
	owner: User;
}
