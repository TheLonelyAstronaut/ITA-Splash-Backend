import admin from 'firebase-admin';

export interface Notification {
	data?: {
		[key: string]: string;
	};
	notification?: admin.messaging.Notification;
}
