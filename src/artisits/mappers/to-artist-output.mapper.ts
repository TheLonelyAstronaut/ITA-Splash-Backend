import { Artist } from '../models/artist.model';
import { ArtistOutput } from '../dto/outputs/artist.output';
import { toAlbumOutput } from '../../albums/mappers/to-album-output.mapper';

type SmartArtistOutput<T> = T extends Artist[] ? ArtistOutput[] : ArtistOutput;

export function toArtistOutput<T extends Artist | Artist[]>(from: T, likedID: number[]): SmartArtistOutput<T> {
	const mapper = (artist: Artist): ArtistOutput => ({
		...artist,
		albums: artist.albums?.map((item) => toAlbumOutput(item, likedID)),
	});

	return (Array.isArray(from) ? from.map(mapper) : mapper(from as Artist)) as SmartArtistOutput<T>;
}
