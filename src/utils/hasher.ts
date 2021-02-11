import * as bcrypt from 'bcrypt';

export async function generateHash(data: string): Promise<string> {
	const saltOrRounds = 10;
	return await bcrypt.hash(data, saltOrRounds);
}

export async function compare(data: string, hash: string): Promise<string> {
	return await bcrypt.compare(data, hash);
}
