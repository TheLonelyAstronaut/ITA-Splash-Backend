import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { FCMTokensModule } from '../firebase/fcm-tokens/fcm-tokens.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artisits/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { PlaylistsModule } from '../playlists/playlists.module';
import { SearchModule } from '../search/search.module';
import { HomeModule } from '../home/home.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			debug: !!parseInt(process.env.DEBUG),
			playground: !!parseInt(process.env.ENABLE_PLAYGROUND),
			autoSchemaFile: 'schema.gql',
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			name: 'default',
			autoLoadEntities: true,
			synchronize: true,
			ssl: {
				rejectUnauthorized: false,
			},
		}),
		AuthenticationModule,
		UsersModule,
		FCMTokensModule,
		TracksModule,
		ArtistsModule,
		AlbumsModule,
		PlaylistsModule,
		SearchModule,
		HomeModule,
	],
})
export class AppModule {}
