import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
	@Field(() => String)
	accessToken: string;
}
