import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { NotificationsResolver } from './resolvers/notifications.resolver';

@Module({
	imports: [],
	providers: [NotificationsResolver, NotificationsService],
	exports: [NotificationsService],
})
export class NotificationsModule {}
