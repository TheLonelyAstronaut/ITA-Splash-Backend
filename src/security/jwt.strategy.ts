import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GenerateTokenInput } from './dto/inputs/generate-token.input';
import { Role } from '../utils/roles/roles.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any): Promise<GenerateTokenInput> {
		return { id: payload.id, email: payload.email, role: payload.role as Role };
	}
}
