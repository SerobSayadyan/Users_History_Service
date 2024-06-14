import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';
import { CreateHistoryDto } from './create-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const history = this.historyRepository.create(createHistoryDto);
    return await this.historyRepository.save(history);
  }

  async findAll(): Promise<History[]> {
    return await this.historyRepository.find();
  }

  async findByUserId(userId: string): Promise<History[]> {
    return await this.historyRepository.find({ where: { userId } });
  }
}
