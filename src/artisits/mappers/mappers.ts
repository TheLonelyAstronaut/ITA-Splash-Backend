import { Artist } from '../models/artist.model';
import { fromMultidimensional } from '../../utils/mappers';

export const getFCMTokens = (artist: Artist): string[] =>
	fromMultidimensional(artist.subscribers.map((subscriber) => subscriber.FCMTokens)).map(
		(tokenObject) => tokenObject.token
	);
