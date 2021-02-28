import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { HomeService } from './services/home.service';
import { UsersService } from '../users/services/users.service';
import { HomeResolver } from './resolvers/home.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	providers: [HomeResolver, HomeService, UsersService],
	exports: [HomeService],
})
export class HomeModule {}
