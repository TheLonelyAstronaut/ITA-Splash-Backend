import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './models/album.model';
import { AlbumsService } from './services/albums.service';
import { AlbumsResolver } from './resolvers/albums.resolver';
import { ArtistsModule } from '../artisits/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { NotificationsModule } from '../firebase/notifications/notifications.module';
import { AWSS3Provider } from '../aws-s3/providers/aws-s3.provider';

@Module({
	imports: [TypeOrmModule.forFeature([Album]), ArtistsModule, TracksModule, NotificationsModule],
	providers: [AlbumsResolver, AlbumsService, AWSS3Provider],
	exports: [AlbumsService],
})
export class AlbumsModule {}
