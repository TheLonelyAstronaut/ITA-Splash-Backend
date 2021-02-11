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

@Injectable()
export class AuthenticationService {
	constructor(
		@InjectRepository(UserRepository) private userRepository: UserRepository,
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

		return this.tokenProvider.generateToken(convertTypes<User, GenerateTokenInput>(user));
	}
}
