import { Query, Resolver } from '@nestjs/graphql';
import { NotificationsService } from '../services/notifications.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../security/guards/gql-auth-guard.guard';
import { RolesGuard } from '../../../utils/roles/roles.guard';
import { Roles } from '../../../utils/roles/roles.decorators';
import { Role } from '../../../utils/roles/roles.enum';

@Resolver()
export class NotificationsResolver {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Query(() => String)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async testNotifications(): Promise<string> {
		await this.notificationsService.sendNotification({
			notification: {
				title: 'New release from Architects',
				body: 'For Those That Wish To Exist',
			},
			data: {
				artistID: '1',
			},
			receivers: [process.env.TEST_NOTIFICATION_TOKEN],
		});

		return '123';
	}
}
