import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../utils/roles/roles.enum';
import { FCMToken } from '../../firebase/fcm-tokens/models/fcm-token.model';

@ObjectType()
export class UserGraphQL {
	@Field((type) => Int)
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
