import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SearchInput {
	@Field()
	@IsNotEmpty()
	query: string;
}
