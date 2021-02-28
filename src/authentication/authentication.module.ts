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
import { Playlist } from '../playlists/models/playlist.model';
import { PlaylistsService } from '../playlists/services/playlists.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository, FCMToken, Playlist]),
		UsersModule,
		TokensModule,
		FCMTokensModule,
	],
	providers: [LoginResolver, RegisterResolver, AuthenticationService, PlaylistsService],
	exports: [AuthenticationService],
})
export class AuthenticationModule {}
