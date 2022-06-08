import { Module } from '@nestjs/common';
import { IntraAuthModule } from './auth/IntraAuth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [IntraAuthModule, UsersModule],
})
export class AppModule {}
