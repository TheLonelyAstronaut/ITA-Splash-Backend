import { FileUpload } from 'graphql-upload';

export interface UploadFileInput extends FileUpload {
	path: string;
}
