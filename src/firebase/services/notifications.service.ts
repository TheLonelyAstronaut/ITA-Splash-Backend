import { Injectable } from '@nestjs/common';
import { SendNotificationInput } from '../dto/inputs/send-notification.input';

@Injectable()
export class NotificationsService {
	async sendNotification(data: SendNotificationInput): Promise<void> {
		//do stuff
	}
}
