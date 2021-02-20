import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddSimilarArtistInput {
	@Field()
	@IsNotEmpty()
	artistID: number;

	@Field()
	@IsNotEmpty()
	similarArtistID: number;
}
