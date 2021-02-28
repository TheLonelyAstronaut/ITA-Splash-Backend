import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationInput } from '../dto/inputs/authentication.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../users/repositories/user.repository';
import { User } from '../../users/models/user.model';
import { compare } from '../../utils/hasher';
import { TokenProvider } from '../../security/tokens.provider';
import { AuthenticationOutput } from '../dto/outputs/authentication.output';
import { convertTypes } from '../../utils/mappers';
import { GenerateTokenInput } from '../../security/dto/inputs/generate-token.input';
import { FCMToken } from '../../firebase/fcm-tokens/models/fcm-token.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
	constructor(
		@InjectRepository(UserRepository) private userRepository: UserRepository,
		@InjectRepository(FCMToken) private FCMTokenRepository: Repository<FCMToken>,
		private readonly tokenProvider: TokenProvider
	) {}

	async authenticate(payload: AuthenticationInput): Promise<AuthenticationOutput> {
		const user: User = await this.userRepository.findOneOrFail({
			where: {
				email: payload.email,
			},
		});

		if (!(await compare(payload.password, user.password))) {
			throw new UnauthorizedException('Incorrect data');
		}

		const token = new FCMToken();
		token.token = payload.FCMToken;
		await this.FCMTokenRepository.save(token);

		if (!user.FCMTokens) {
			user.FCMTokens = [token];
		} else {
			user.FCMTokens = [...user.FCMTokens, token];
		}

		await this.userRepository.save(user);

		return await this.tokenProvider.generateToken(convertTypes<User, GenerateTokenInput>(user));
	}
}
