import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Artist } from '../../models/artist.model';
import { AlbumOutput } from '../../../albums/dto/outputs/album.output';

@ObjectType()
export class ArtistOutput {
	@Field()
	@IsNotEmpty()
	name: string;

	@Field()
	@IsNotEmpty()
	image: string;

	@Field()
	@IsNotEmpty()
	id: number;

	@Field(() => [ArtistOutput], { nullable: 'items' })
	similarArtists: Artist[];

	@Field(() => [AlbumOutput])
	albums: AlbumOutput[];
}
