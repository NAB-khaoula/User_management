import { Module } from '@nestjs/common';
import { BetaUsersService } from './users.service';

@Module({
  providers: [BetaUsersService],
  exports: [BetaUsersService],
})
export class BetaUsersModule {}
