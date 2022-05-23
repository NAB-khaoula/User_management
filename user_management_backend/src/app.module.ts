import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntraAuthModule } from './42-auth/IntraAuth.module';

@Module({
  imports: [IntraAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
