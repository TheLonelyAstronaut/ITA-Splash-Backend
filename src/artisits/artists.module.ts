import { Module } from '@nestjs/common';
import { Artist } from './models/artist.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { ArtistsService } from './services/artists.service';

@Module({
	imports: [TypeOrmModule.forFeature([Artist])],
	providers: [ArtistsResolver, ArtistsService],
	exports: [ArtistsService],
})
export class ArtistsModule {}
