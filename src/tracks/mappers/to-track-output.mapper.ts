import { Track } from '../models/track.model';
import { TrackOutput } from '../dto/outputs/track.output';
import { Album } from '../../albums/models/album.model';

type SmartTrackOutput<T> = T extends Track[] ? TrackOutput[] : TrackOutput;

export function toTrackOutput<T extends Track | Track[]>(
	from: T,
	likedID: number[],
	album?: Album
): SmartTrackOutput<T> {
	const mapper = (track: Track): TrackOutput => ({
		id: track.id,
		albumID: album ? album.id : track.album.id,
		artistID: album ? album.artist.id : track.album.artist.id,
		artistName: album ? album.artist.name : track.album.artist.name,
		title: track.title,
		url: track.url,
		artwork: album ? album.artwork : track.album.artwork,
		liked: likedID.indexOf(track.id) != -1,
	});

	return (Array.isArray(from) ? from.map(mapper) : mapper(from as Track)) as SmartTrackOutput<T>;
}
