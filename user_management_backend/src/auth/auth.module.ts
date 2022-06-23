import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BetaUsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.startegy';

@Module({
  providers: [AuthService, LocalStrategy, JwtService],
  imports: [BetaUsersModule, PassportModule],
})
export class AuthModule {}
