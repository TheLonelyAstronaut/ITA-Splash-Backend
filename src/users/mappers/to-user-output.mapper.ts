import { UserOutput } from '../dto/outputs/user.output';
import { User } from '../models/user.model';
import { toPlaylistOutput } from '../../playlists/mappers/to-playlist-output.mapper';

export const toUserOutput = (user: User): UserOutput => ({
	...user,
	subscriptions: user.subscriptions.map((artist) => artist.id),
	playlists: toPlaylistOutput(user.playlists),
});
