import { Module } from '@nestjs/common';
import { IntraAuthModule } from './intra-auth/IntraAuth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { User } from './users/user.entity';
import { TwofactorauthModule } from './2fa/2fa.module';

@Module({
  imports: [
    IntraAuthModule,
    UsersModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './uploads'),
    }),
    TwofactorauthModule,
  ],
  controllers: [],
})
export class AppModule {}
