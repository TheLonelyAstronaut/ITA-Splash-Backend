import { Playlist } from '../models/playlist.model';
import { PlaylistOutput } from '../dto/outputs/playlist.output';
import { toTrackOutput } from '../../tracks/mappers/to-track-output.mapper';

type SmartPlaylistOutput<T> = T extends Playlist[] ? PlaylistOutput[] : PlaylistOutput;

export function toPlaylistOutput<T extends Playlist | Playlist[]>(from: T): SmartPlaylistOutput<T> {
	const mapper = (playlist: Playlist): PlaylistOutput => ({
		id: playlist.id,
		name: playlist.name,
		liked: playlist.liked,
		tracks: toTrackOutput(playlist.tracks),
	});

	return (Array.isArray(from) ? from.map(mapper) : mapper(from as Playlist)) as SmartPlaylistOutput<T>;
}
