import { Artist } from '../../../artisits/models/artist.model';
import { Album } from '../../../albums/models/album.model';
import admin from 'firebase-admin';

export const toNotification = (
	artist: Artist,
	album: Album
): {
	notification: admin.messaging.WebpushNotification;
	data?: {
		[key: string]: string;
	};
} => ({
	notification: {
		title: `New release from ${artist.name}`,
		body: album.name,
	},
	data: {
		artist: JSON.stringify({ id: artist.id, name: artist.name, image: artist.image }),
		album: JSON.stringify({ id: album.id, name: album.name, image: album.artwork }),
	},
});
