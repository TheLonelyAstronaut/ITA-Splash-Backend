import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
