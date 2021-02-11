import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../models/user.entity';
import { cloneFields } from '../../utils/mappers';
import { generateHash } from '../../utils/hasher';
import { Role } from '../../utils/roles/roles.enum';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

	async create(data: User): Promise<void> {
		const userEntity = new UserEntity();
		cloneFields<User, UserEntity>(data, userEntity);
		userEntity.password = await generateHash(userEntity.password);
		userEntity.role = Role.Admin;

		await this.userRepository.save(userEntity);
	}

	async findById(id: number): Promise<User> {
		return await this.userRepository.findOneOrFail({
			where: {
				id,
			},
		});
	}
}
