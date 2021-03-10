import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { TrackOutput } from '../../../tracks/dto/outputs/track.output';

@ObjectType()
export class AlbumOutput {
	@Field()
	@IsNotEmpty()
	name: string;

	@Field()
	@IsNotEmpty()
	artistName: string;

	@Field()
	@IsNotEmpty()
	artistID: number;

	@Field()
	@IsNotEmpty()
	artwork: string;

	@Field()
	@IsNotEmpty()
	id: number;

	@Field(() => [TrackOutput])
	tracks: TrackOutput[];
}
