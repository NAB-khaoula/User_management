import { HttpModule, Module } from '@nestjs/common';
import { IntraAuthService } from './services/IntraAuth.service';
import { IntraAuthController } from './IntraAuth.controller';
import { fourtyTwoStrategy } from './Strategies/intra.strategy';
import { IntraAuthGuard } from './Guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/officialUsers/users.service';
import { UsersModule } from 'src/officialUsers/users.module';

@Module({
  imports: [HttpModule, JwtModule.register({}), UsersModule],
  controllers: [IntraAuthController],
  providers: [
    IntraAuthService,
    fourtyTwoStrategy,
    IntraAuthGuard,
    UsersService,
  ],
})
export class IntraAuthModule {}
