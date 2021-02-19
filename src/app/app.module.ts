import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { FCMTokensModule } from '../firebase/fcm-tokens/fcm-tokens.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			debug: true,
			playground: true,
			autoSchemaFile: 'schema.gql',
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			autoLoadEntities: true,
			synchronize: true,
		}),
		AuthenticationModule,
		UsersModule,
		FCMTokensModule,
		TracksModule,
	],
})
export class AppModule {}
