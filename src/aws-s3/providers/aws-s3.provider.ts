import { Injectable } from '@nestjs/common';
import { UploadFileOutput } from '../dto/outputs/upload-file.output';
import { UploadFileInput } from '../dto/inputs/upload-file.input';

@Injectable()
export class AWSS3Provider {
	async uploadFile(data: UploadFileInput): Promise<UploadFileOutput> {
		return {
			url: 'mock',
		};
	}
}
