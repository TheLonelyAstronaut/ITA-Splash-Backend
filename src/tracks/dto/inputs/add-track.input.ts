import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddTrackInput {
	@Field()
	@IsNotEmpty()
	title: string;

	@Field()
	@IsNotEmpty()
	url: string;
}
