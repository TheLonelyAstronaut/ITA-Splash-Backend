import AWS from 'aws-sdk';
import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { UploadFileOutput } from '../dto/outputs/upload-file.output';
import { UploadFileInput } from '../dto/inputs/upload-file.input';
import { ReadStream } from 'fs';

@Injectable()
export class AWSS3Provider {
	private readonly S3Object: AWS.S3;

	constructor() {
		this.S3Object = new AWS.S3({
			region: process.env.AWS_REGION,
		});
	}

	async uploadFile(data: UploadFileInput): Promise<UploadFileOutput> {
		const newName: string = crypto.randomBytes(16).toString('hex') + '.' + data.mimetype.split('/')[1];

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
