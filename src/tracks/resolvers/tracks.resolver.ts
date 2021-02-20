import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { RolesGuard } from '../../utils/roles/roles.guard';
import { Roles } from '../../utils/roles/roles.decorators';
import { Role } from '../../utils/roles/roles.enum';
import { UsersService } from '../../users/services/users.service';
import { NotificationsService } from '../../firebase/notifications/services/notifications.service';
import { AddTrackInput } from '../dto/inputs/add-track.input';
import { TrackOutput } from '../dto/outputs/track.output';

@Resolver()
export class TracksResolver {
	constructor(
		private readonly tracksService: TracksService,
		private readonly usersService: UsersService,
		private readonly notificationsService: NotificationsService
	) {}

	@Mutation(() => TrackOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addTrack(@Args('data') data: AddTrackInput): Promise<TrackOutput> {
		return await this.tracksService.create(data);
		/*const users = await this.usersService.getSubscribers(1);

		const tokens: string[] = [];
		users.forEach((user) => {
			user.FCMTokens.forEach((token) => {
				tokens.push(token.token);
			});
		});

		await this.notificationsService.sendNotification({
			receivers: tokens,
			notification: {
				title: 'Test notification',
				body: 'Just to check if it works',
			},
		});*/
	}
}
