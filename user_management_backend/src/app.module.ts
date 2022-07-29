import { Module } from '@nestjs/common';
import { IntraAuthModule } from './intra-auth/IntraAuth.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

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
  ],
  controllers: [],
})
export class AppModule {}
