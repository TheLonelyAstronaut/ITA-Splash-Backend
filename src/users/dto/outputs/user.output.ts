import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { PlaylistOutput } from '../../../playlists/dto/outputs/playlist.output';

@ObjectType()
export class UserOutput {
	@Field()
	@IsNotEmpty()
	id: number;

	@Field()
	@IsNotEmpty()
	email: string;

	@Field()
	@IsNotEmpty()
	username: string;

	@Field(() => [Int])
	@IsNotEmpty()
	subscriptions: number[];

	@Field(() => [PlaylistOutput])
	@IsNotEmpty()
	playlists: PlaylistOutput[];
}
