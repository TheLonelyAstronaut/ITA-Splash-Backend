import { AlbumOutput } from '../dto/outputs/album.output';
import { Album } from '../models/album.model';
import { toTrackOutput } from './to-track-input.mapper';

export const toAlbumOutput = (album: Album): AlbumOutput => ({
	id: album.id,
	artwork: album.artwork,
	name: album.name,
	tracks: toTrackOutput(album.tracks, album),
});
