import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './models/playlist.model';
import { PlaylistsResolver } from './resolvers/playlists.resolver';
import { PlaylistsService } from './services/playlists.service';
import { UsersModule } from '../users/users.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
	imports: [TypeOrmModule.forFeature([Playlist]), UsersModule, TracksModule],
	providers: [PlaylistsResolver, PlaylistsService],
	exports: [PlaylistsService],
})
export class PlaylistsModule {}
