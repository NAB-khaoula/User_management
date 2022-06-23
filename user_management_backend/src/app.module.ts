import { Module } from '@nestjs/common';
import { IntraAuthModule } from './intra-auth/IntraAuth.module';
import { UsersModule } from './officialUsers/users.module';
import { AuthModule } from './auth/auth.module';
import { BetaUsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [IntraAuthModule, UsersModule, AuthModule, BetaUsersModule],
  controllers: [AppController],
})
export class AppModule {}
