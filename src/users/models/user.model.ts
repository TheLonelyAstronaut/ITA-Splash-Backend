import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../utils/roles/roles.enum';
import { FCMToken } from '../../firebase/fcm-tokens/models/fcm-token.model';

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
}
