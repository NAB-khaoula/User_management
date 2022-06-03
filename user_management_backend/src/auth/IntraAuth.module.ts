import { HttpModule, Module } from '@nestjs/common';
import { IntraAuthService } from './services/IntraAuth.service';
import { IntraAuthController } from './IntraAuth.controller';
import { fourtyTwoStrategy } from './Strategies/intra.strategy';
import { IntraAuthGuard } from './Guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule.register({})],
  controllers: [IntraAuthController],
  providers: [IntraAuthService, fourtyTwoStrategy, IntraAuthGuard],
})
export class IntraAuthModule {}
