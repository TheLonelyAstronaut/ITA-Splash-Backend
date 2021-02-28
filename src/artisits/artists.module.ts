import { Module } from '@nestjs/common';
import { Artist } from './models/artist.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { ArtistsService } from './services/artists.service';
import { AWSS3Provider } from '../aws-s3/providers/aws-s3.provider';

@Module({
	imports: [TypeOrmModule.forFeature([Artist])],
	providers: [ArtistsResolver, ArtistsService, AWSS3Provider],
	exports: [ArtistsService],
})
export class ArtistsModule {}
