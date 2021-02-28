import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FCMTokensService } from './services/fcm-tokens.service';
import { FCMToken } from './models/fcm-token.model';

@Module({
	imports: [TypeOrmModule.forFeature([FCMToken])],
	providers: [FCMTokensService],
	exports: [FCMTokensService],
})
export class FCMTokensModule {}
