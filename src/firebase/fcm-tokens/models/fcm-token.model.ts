import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../users/models/user.model';

@Entity()
export class FCMToken {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	token: string;

	@ManyToOne(() => User, (user) => user.FCMTokens)
	user: User;
}
