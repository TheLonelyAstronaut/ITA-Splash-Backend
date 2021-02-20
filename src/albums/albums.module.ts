import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './models/album.model';
import { AlbumsService } from './services/albums.service';
import { AlbumsResolver } from './resolvers/albums.resolver';
import { ArtistsModule } from '../artisits/artists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
	imports: [TypeOrmModule.forFeature([Album]), ArtistsModule, TracksModule],
	providers: [AlbumsResolver, AlbumsService],
	exports: [AlbumsService],
})
export class AlbumsModule {}
