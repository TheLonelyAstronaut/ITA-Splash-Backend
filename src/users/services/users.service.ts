import { Injectable } from '@nestjs/common';
import { UserGraphQL } from '../models/user.graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { cloneFields } from '../../utils/mappers';
import { generateHash } from '../../utils/hasher';
import { Role } from '../../utils/roles/roles.enum';
import { Artist } from '../../artisits/models/artist.model';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

	async create(data: UserGraphQL): Promise<void> {
		const userEntity = new User();
		cloneFields<UserGraphQL, User>(data, userEntity);
		userEntity.password = await generateHash(userEntity.password);
		userEntity.role = Role.Admin;
		userEntity.FCMTokens = [];
		userEntity.subscriptions = [];

		await this.userRepository.save(userEntity);
	}

	async findById(id: number, relations?: string[]): Promise<User> {
		return await this.userRepository.findOneOrFail({
			where: {
				id,
			},
			relations,
		});
	}

	async subscribe(id: number, artist: Artist): Promise<Artist[]> {
		const user = await this.findById(id, ['subscriptions']);

		const index = user.subscriptions.findIndex((sub) => sub.id === artist.id);

		if (index >= 0) {
			user.subscriptions.splice(index, 1);
		} else {
			user.subscriptions = [...user.subscriptions, artist];
		}

		await this.userRepository.save(user);
		return user.subscriptions;
	}
}
