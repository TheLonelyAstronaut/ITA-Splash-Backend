import { Role } from '../../../utils/roles/roles.enum';

export interface GenerateTokenInput {
	email: string;
	id: number;
	role: Role;
}
