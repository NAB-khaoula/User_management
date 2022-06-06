import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntraAuthModule } from './auth/IntraAuth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { user } from './users/users.entity';

@Module({
  imports: [
    IntraAuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: '987654',
      database: 'db',
      synchronize: true,
      entities: [user],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([user]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
