import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddAlbumInput {
	@Field()
	@IsNotEmpty()
	name: string;

	@Field()
	@IsNotEmpty()
	image: string;

	@Field(() => [Int])
	@IsNotEmpty()
	tracks: number[];

	@Field()
	@IsNotEmpty()
	artistID: number;
}
