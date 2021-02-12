import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FCMToken } from '../models/fcm-token.model';

@Injectable()
export class FCMTokensService {
	constructor(@InjectRepository(FCMToken) private userRepository: Repository<FCMToken>) {}
}
