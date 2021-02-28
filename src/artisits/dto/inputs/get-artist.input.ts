import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GetArtistInput {
	@Field()
	@IsNotEmpty()
	id: number;
}
