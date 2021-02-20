import { Track } from '../../tracks/models/track.model';
import { TrackOutput } from '../../tracks/dto/outputs/track.output';

export const toTrackOutput = (tracks: Track[]): TrackOutput[] =>
	tracks.map((track) => ({
		id: track.id,
		albumID: track.album.id,
		artistID: track.album.artist.id,
		title: track.title,
		url: track.url,
		artwork: track.album.artwork,
	}));
