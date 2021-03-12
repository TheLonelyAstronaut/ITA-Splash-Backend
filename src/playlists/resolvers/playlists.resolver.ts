import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PlaylistsService } from '../services/playlists.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { UserGraphQL } from '../../users/models/user.graphql';
import { AddOrRemoveInput } from '../dto/inputs/add-or-remove.input';
import { CreatePlaylistInput } from '../dto/inputs/create-playlist.input';
import { PlaylistOutput } from '../dto/outputs/playlist.output';
import { toPlaylistOutput } from '../mappers/to-playlist-output.mapper';
import { UsersService } from '../../users/services/users.service';
import { TracksService } from '../../tracks/services/tracks.service';

@Resolver()
export class PlaylistsResolver {
	constructor(
		private readonly playlistsService: PlaylistsService,
		private readonly usersService: UsersService,
		private readonly tracksService: TracksService
	) {}

	@Mutation(() => PlaylistOutput)
	@UseGuards(GqlAuthGuard)
	async createPlaylist(
		@CurrentUser() parsedUser: UserGraphQL,
		@Args('data') data: CreatePlaylistInput
	): Promise<PlaylistOutput> {
		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const playlist = await this.playlistsService.create(user, data);

		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toPlaylistOutput(playlist, likedID);
	}

	@Mutation(() => PlaylistOutput)
	@UseGuards(GqlAuthGuard)
	async addOrRemoveFromPlaylist(
		@CurrentUser() parsedUser: UserGraphQL,
		@Args('data') data: AddOrRemoveInput
	): Promise<PlaylistOutput> {
		const track = await this.tracksService.findByID(data.trackID, ['album', 'album.artist']);
		const updatedPlaylist = await this.playlistsService.addOrRemoveFromPlaylist(track, data.playlistID);

		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toPlaylistOutput(updatedPlaylist, likedID);
	}

	@Query(() => PlaylistOutput)
	@UseGuards(GqlAuthGuard)
	async getPlaylist(
		@CurrentUser() parsedUser: UserGraphQL,
		@Args('data') playlistID: number
	): Promise<PlaylistOutput> {
		const playlist = await this.playlistsService.findByID(playlistID, [
			'tracks',
			'tracks.album',
			'tracks.album.artist',
		]);

		const user = await this.usersService.findById(parsedUser.id, ['playlists', 'playlists.tracks']);
		const likedID = user.playlists.find((item) => item.liked).tracks.map((track) => track.id);

		return toPlaylistOutput(playlist, likedID);
	}
}
