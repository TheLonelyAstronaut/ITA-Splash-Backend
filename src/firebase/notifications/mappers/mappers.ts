import { Artist } from '../../../artisits/models/artist.model';
import { Album } from '../../../albums/models/album.model';
import admin from 'firebase-admin';

export const toNotification = (artist: Artist, album: Album): admin.messaging.WebpushNotification => ({
	data: {
		artist: { id: artist.id, name: artist.name, image: artist.image },
		album: { id: album.id, name: album.name, image: album.artwork },
	},
});
