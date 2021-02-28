import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../albums/models/album.model';
import { Track } from '../tracks/models/track.model';
import { Artist } from '../artisits/models/artist.model';
import { SearchResolver } from './resolvers/search.resolver';
import { SearchService } from './services/search.service';

@Module({
	imports: [TypeOrmModule.forFeature([Album, Track, Artist])],
	providers: [SearchResolver, SearchService],
	exports: [SearchService],
})
export class SearchModule {}
