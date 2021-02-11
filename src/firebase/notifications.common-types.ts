export interface NotificationReceiver {
	id: number;
	firebaseToken: string;
}

export interface Notification {
	title: string;
	description: string;
}
