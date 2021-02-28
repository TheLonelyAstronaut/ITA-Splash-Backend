import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { AlbumOutput } from '../../../albums/dto/outputs/album.output';
import { ArtistOutput } from '../../../artisits/dto/outputs/artist.output';
import { TrackOutput } from '../../../tracks/dto/outputs/track.output';
import { PlaylistOutput } from '../../../playlists/dto/outputs/playlist.output';

export const HomepageData = createUnionType({
	name: 'HomepageData',
	types: () => [ArtistOutput, PlaylistOutput, AlbumOutput],
	resolveType: (value) => {
		if (value.image) {
			return ArtistOutput;
		}
		if (value.liked != undefined) {
			return PlaylistOutput;
		}
		if (value.artwork) {
			return AlbumOutput;
		}

		return null;
	},
});

@ObjectType()
export class HomepageDataOutput {
	@Field()
	@IsNotEmpty()
	title: string;

	@Field(() => [HomepageData])
	data: (AlbumOutput | PlaylistOutput | ArtistOutput)[];
}
