import { Injectable } from '@nestjs/common';
import { UserGraphQL } from '../models/user.graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { cloneFields } from '../../utils/mappers';
import { generateHash } from '../../utils/hasher';
import { Role } from '../../utils/roles/roles.enum';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

	async create(data: UserGraphQL): Promise<void> {
		const userEntity = new User();
		cloneFields<UserGraphQL, User>(data, userEntity);
		userEntity.password = await generateHash(userEntity.password);
		userEntity.role = Role.Admin;
		userEntity.FCMTokens = [];

		await this.userRepository.save(userEntity);
	}

	async findById(id: number): Promise<UserGraphQL> {
		return await this.userRepository.findOneOrFail({
			where: {
				id,
			},
		});
	}
}
