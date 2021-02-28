import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { AlbumOutput } from '../../../albums/dto/outputs/album.output';
import { ArtistOutput } from '../../../artisits/dto/outputs/artist.output';
import { TrackOutput } from '../../../tracks/dto/outputs/track.output';

@ObjectType()
export class SearchOutput {
	@Field(() => [ArtistOutput])
	@IsNotEmpty()
	artists: ArtistOutput[];

	@Field(() => [AlbumOutput])
	@IsNotEmpty()
	albums: AlbumOutput[];

	@Field(() => [TrackOutput])
	@IsNotEmpty()
	tracks: TrackOutput[];
}
