import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenInput } from './dto/inputs/generate-token.input';
import { GenerateTokenOutput } from './dto/outputs/generate-token.output';

@Injectable()
export class TokenProvider {
	constructor(private jwtService: JwtService) {}

	async generateToken(data: GenerateTokenInput): Promise<GenerateTokenOutput> {
		return {
			accessToken: this.jwtService.sign(data),
		};
	}
}
