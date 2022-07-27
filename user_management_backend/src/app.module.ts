import { Module } from '@nestjs/common';
import { IntraAuthModule } from './intra-auth/IntraAuth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [IntraAuthModule, UsersModule, AuthModule],
  controllers: [],
})
export class AppModule {}
