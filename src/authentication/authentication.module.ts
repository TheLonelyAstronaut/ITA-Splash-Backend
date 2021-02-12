import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginResolver } from './resolvers/login.resolver';
import { RegisterResolver } from './resolvers/register.resolver';
import { AuthenticationService } from './services/authentication.service';
import { UserRepository } from '../users/repositories/user.repository';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../security/tokens.module';
import { FCMTokensModule } from '../firebase/fcm-tokens/fcm-tokens.module';
import { FCMToken } from '../firebase/fcm-tokens/models/fcm-token.model';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository, FCMToken]), UsersModule, TokensModule, FCMTokensModule],
	providers: [LoginResolver, RegisterResolver, AuthenticationService],
	exports: [AuthenticationService],
})
export class AuthenticationModule {}
