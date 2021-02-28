import { Injectable } from '@nestjs/common';
import { SendNotificationInput } from '../dto/inputs/send-notification.input';
import admin from 'firebase-admin';

const cert = JSON.parse(process.env.GOOGLE_PRIVATE_CONFIG);

admin.initializeApp({
	credential: admin.credential.cert({
		projectId: cert.project_id,
		clientEmail: cert.client_email,
		privateKey: cert.private_key,
	}),
});

@Injectable()
export class NotificationsService {
	async sendNotification(data: SendNotificationInput): Promise<void> {
		if (!data.receivers.length) {
			return;
		}

		admin
			.messaging()
			.sendMulticast({
				notification: data.notification,
				tokens: data.receivers,
			})
			.then((response) => {
				console.log(response);
			});
	}
}
