import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersService from './users.service';
import UsersController from './users.controller';
import User from './users.entity';
import { History } from 'src/history/history.entity';
import { HistoryService } from 'src/history/history.service';
import { HistoryController } from 'src/history/history.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, History]),
  ],
  providers: [UsersService, HistoryService],
  controllers: [UsersController, HistoryController],
  exports: [UsersService, HistoryService],
})
class UsersModule {}

export default UsersModule;
