import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { user } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
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
    UsersModule,
  ],
})
export class UsersModule {}
