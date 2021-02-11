import { Injectable } from '@nestjs/common';
import { AuthenticationInput } from '../dto/inputs/authentication.input';

@Injectable()
export class AuthenticationService {
	async authenticate(payload: AuthenticationInput): Promise<void> {
		console.log('VADZIIIIIIIIM');
	}
}
