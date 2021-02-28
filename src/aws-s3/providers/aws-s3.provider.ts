import { S3 } from 'aws-sdk';
import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { UploadFileOutput } from '../dto/outputs/upload-file.output';
import { UploadFileInput } from '../dto/inputs/upload-file.input';
import { ReadStream } from 'fs';

@Injectable()
export class AWSS3Provider {
	private readonly S3Object: S3;

	constructor() {
		this.S3Object = new S3({
			region: process.env.AWS_REGION,
		});
	}

	async uploadFile(data: UploadFileInput): Promise<UploadFileOutput> {
		const splitName = data.filename.split('.');
		const type = splitName[splitName.length - 1];
		const newName: string = randomBytes(16).toString('hex') + '.' + type;

		const stream: ReadStream = data.createReadStream();

		const result = await this.S3Object.upload({
			Bucket: process.env.AWS_BUCKET_NAME,
			ACL: 'public-read',
			Key: `${data.path}/${newName}`,
			Body: stream,
			ContentType: data.mimetype,
		}).promise();

		return {
			url: result.Location,
		};
	}
}
