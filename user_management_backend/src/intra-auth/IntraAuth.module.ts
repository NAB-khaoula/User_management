import { HttpModule, Module } from '@nestjs/common';
import { IntraAuthService } from './services/IntraAuth.service';
import { IntraAuthController } from './IntraAuth.controller';
import { fourtyTwoStrategy } from './Strategies/intra.strategy';
import { IntraAuthGuard } from './Guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    UsersModule,
  ],
  controllers: [IntraAuthController],
  providers: [
    IntraAuthService,
    fourtyTwoStrategy,
    IntraAuthGuard,
    UsersService,
    AuthService,
  ],
})
export class IntraAuthModule {}
