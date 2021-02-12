import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { FCMToken } from '../../../firebase/fcm-tokens/models/fcm-token.model';

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
