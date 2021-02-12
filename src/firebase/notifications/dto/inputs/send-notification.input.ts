import admin from 'firebase-admin';

export interface SendNotificationInput {
	notification: Notification;
	receivers: string[];
}
