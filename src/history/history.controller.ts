import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async find(@Query('userId') userId?: string) {
    if (userId) {
      return this.historyService.findByUserId(userId);
    }
    return this.historyService.findAll();
  }


}
