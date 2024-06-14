import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from './history/history.module';
import UsersModule from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import UsersController from './users/users.controller';
import { HistoryController } from './history/history.controller';
import { History } from './history/history.entity';
import User from './users/users.entity';
import UsersService from './users/users.service';
import { HistoryService } from './history/history.service';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forFeature([User, History]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    HistoryModule,
  ],
  controllers: [UsersController, HistoryController],
  providers: [UsersService, HistoryService],
  exports: [UsersService, HistoryService],
})
export class AppModule {}
