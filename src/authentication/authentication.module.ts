import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginResolver } from './resolvers/login.resolver';
import { RegisterResolver } from './resolvers/register.resolver';
import { AuthenticationService } from './services/authentication.service';
import { UserRepository } from '../users/repositories/user.repository';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../security/tokens.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository]), UsersModule, TokensModule],
	providers: [LoginResolver, RegisterResolver, AuthenticationService],
	exports: [AuthenticationService],
})
export class AuthenticationModule {}
