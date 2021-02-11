import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';
import { Role } from '../../utils/roles/roles.enum';

@Entity()
export class UserEntity {
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
}
