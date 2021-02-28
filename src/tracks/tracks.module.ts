import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './services/tracks.service';
import { Track } from './models/track.model';
import { TracksResolver } from './resolvers/tracks.resolver';
import { AWSS3Provider } from '../aws-s3/providers/aws-s3.provider';

@Module({
	imports: [TypeOrmModule.forFeature([Track])],
	providers: [TracksResolver, TracksService, AWSS3Provider],
	exports: [TracksService],
})
export class TracksModule {}
