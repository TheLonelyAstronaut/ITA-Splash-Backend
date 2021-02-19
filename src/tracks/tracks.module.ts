import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './services/tracks.service';
import { Track } from './models/track.model';
import { TracksResolver } from './resolvers/tracks.resolver';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../firebase/notifications/notifications.module';

@Module({
	imports: [TypeOrmModule.forFeature([Track]), UsersModule, NotificationsModule],
	providers: [TracksResolver, TracksService],
	exports: [TracksService],
})
export class TracksModule {}
