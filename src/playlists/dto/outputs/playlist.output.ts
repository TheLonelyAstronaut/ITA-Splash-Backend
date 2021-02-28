import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { TrackOutput } from '../../../tracks/dto/outputs/track.output';

@ObjectType()
export class PlaylistOutput {
	@Field()
	@IsNotEmpty()
	name: string;

	@Field()
	@IsNotEmpty()
	id: number;

	@Field()
	@IsNotEmpty()
	liked: boolean;

	@Field(() => [TrackOutput])
	tracks: TrackOutput[];
}
