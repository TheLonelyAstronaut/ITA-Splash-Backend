import { Track } from '../models/track.model';
import { TrackOutput } from '../dto/outputs/track.output';
import { Album } from '../../albums/models/album.model';

export const toTrackOutput = (tracks: Track[], album?: Album): TrackOutput[] =>
	tracks.map((track) => ({
		id: track.id,
		albumID: album ? album.id : track.album.id,
		artistID: album ? album.artist.id : track.album.artist.id,
		title: track.title,
		url: track.url,
		artwork: album ? album.artwork : track.album.artwork,
	}));
