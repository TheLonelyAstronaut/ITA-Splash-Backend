import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class TrackOutput {
	@Field()
	@IsNotEmpty()
	id: number;

	@Field()
	@IsNotEmpty()
	title: string;

	@Field()
	@IsNotEmpty()
	url: string;

	@Field()
	artwork?: string;

	@Field()
	albumID?: number;

	@Field()
	artistID?: number;
}
