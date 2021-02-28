import { Module } from '@nestjs/common';
import { TokenProvider } from './tokens.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '16000s' },
		}),
	],
	providers: [TokenProvider, JwtStrategy],
	exports: [TokenProvider],
})
export class TokensModule {}
