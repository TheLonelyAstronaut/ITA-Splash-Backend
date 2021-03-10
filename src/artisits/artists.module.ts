import { Module } from '@nestjs/common';
import { Artist } from './models/artist.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { ArtistsService } from './services/artists.service';
import { AWSS3Provider } from '../aws-s3/providers/aws-s3.provider';
import { UsersService } from '../users/services/users.service';
import { UserRepository } from '../users/repositories/user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Artist, UserRepository])],
	providers: [ArtistsResolver, ArtistsService, AWSS3Provider, UsersService],
	exports: [ArtistsService],
})
export class ArtistsModule {}
