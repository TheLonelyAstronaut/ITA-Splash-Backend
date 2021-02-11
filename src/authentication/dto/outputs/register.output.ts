import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterOutput {
	@Field(() => String)
	accessToken: string;
}
