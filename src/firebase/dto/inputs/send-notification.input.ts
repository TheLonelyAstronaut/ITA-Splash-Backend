import { NotificationReceiver, Notification } from '../../notifications.common-types';

export interface SendNotificationInput {
	notification: Notification;
	receivers: NotificationReceiver[];
}
