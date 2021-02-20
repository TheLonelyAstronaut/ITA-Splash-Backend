import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../utils/roles/roles.enum';

@ObjectType()
export class UserGraphQL {
	@Field(() => Int)
	id: number;

	@Field()
	@IsNotEmpty()
	username: string;

	@Field()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field()
	@IsNotEmpty()
	password: string;

	@Field()
	@IsNotEmpty()
	role: Role;
}
