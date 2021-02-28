import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddOrRemoveInput {
	@Field()
	@IsNotEmpty()
	playlistID: number;

	@Field()
	@IsNotEmpty()
	trackID: number;
}
