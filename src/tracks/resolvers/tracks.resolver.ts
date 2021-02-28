import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/gql-auth-guard.guard';
import { RolesGuard } from '../../utils/roles/roles.guard';
import { Roles } from '../../utils/roles/roles.decorators';
import { Role } from '../../utils/roles/roles.enum';
import { TrackOutput } from '../dto/outputs/track.output';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { AWSS3Provider } from '../../aws-s3/providers/aws-s3.provider';

@Resolver()
export class TracksResolver {
	constructor(private readonly tracksService: TracksService, private readonly uploadProvider: AWSS3Provider) {}

	@Mutation(() => TrackOutput)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	async addTrack(
		@Args('title') title: string,
		@Args('file', { type: () => GraphQLUpload }) file: Promise<FileUpload>
	): Promise<TrackOutput> {
		const toUpload = await file;

		const output = await this.uploadProvider.uploadFile({
			...toUpload,
			path: `${Date.now().toString()}`,
		});

		return await this.tracksService.create(title, output.url);
	}
}
