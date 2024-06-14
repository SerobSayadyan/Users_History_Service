import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './users.entity';
import { HistoryService } from 'src/history/history.service';

@Injectable()
@Inject()
class UsersService {
  constructor(
    @InjectRepository(User)
    usersRepository,
    @Inject(HistoryService)
    historyService
  ) {
    this.usersRepository = usersRepository;
    
    this.historyService = historyService;
  }

  async create(createUserDto) {
    const userCreate = this.usersRepository.create(createUserDto);
    const user = await this.usersRepository.save(userCreate)
    console.log(user.id);

    const createHistoryDto = {
      userId: user.id,
      action: `User \nname: '${user.name}' \nemail: '${user.email}' \nhas been created with id: ${user.id}`,
    }
    await this.historyService.create(createHistoryDto);
    return user;
  }

  async update(id, updateUserDto) {
    const updateHistoryDto = {
      userId: id,
      action: `user with id: '${id}' updated \n\tname: '${updateUserDto.name}' \nand \n\temail: '${updateUserDto.email}'`,
    }
    await this.historyService.create(updateHistoryDto);
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async findOne(id) {
    return await this.usersRepository.find({where: { id: id }})
  }

  findAll() {
    return this.usersRepository.find();
  }
}

export default UsersService;
