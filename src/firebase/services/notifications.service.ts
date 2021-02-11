import { Injectable } from '@nestjs/common';
import { SendNotificationInput } from '../dto/inputs/send-notification.input';
import admin from 'firebase-admin';

admin.initializeApp({
	credential: admin.credential.cert(process.env.GOOGLE_PRIVATE_CONFIG),
});

@Injectable()
export class NotificationsService {
	async sendNotification(data: SendNotificationInput): Promise<void> {
		await admin.messaging().sendMulticast({
			...data.notification,
			tokens: data.receivers,
		});
	}
}
