import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

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
}
