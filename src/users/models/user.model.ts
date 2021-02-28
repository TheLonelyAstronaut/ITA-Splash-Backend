import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../utils/roles/roles.enum';
import { FCMToken } from '../../firebase/fcm-tokens/models/fcm-token.model';
import { Artist } from '../../artisits/models/artist.model';
import { Playlist } from '../../playlists/models/playlist.model';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	username: string;

	@Column()
	role: Role;

	@OneToMany(() => FCMToken, (token) => token.user)
	FCMTokens: FCMToken[];

	@ManyToMany(() => Artist, (artist) => artist.subscribers)
	@JoinTable()
	subscriptions: Artist[];

	@OneToMany(() => Playlist, (playlist) => playlist.owner)
	playlists: Playlist[];
}
