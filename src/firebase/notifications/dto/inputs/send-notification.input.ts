import admin from 'firebase-admin';

export interface SendNotificationInput {
	notification: admin.messaging.WebpushNotification;
	receivers: string[];
}
