import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
	async create(data: User): Promise<void> {
		console.log('CREATED');
	}
}
