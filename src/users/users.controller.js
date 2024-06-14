import { Controller, Get, Post, Put, Body, Param, Inject, Patch } from '@nestjs/common';
import UsersService from './users.service';

@Controller('users')
class UsersController {
  constructor(
    @Inject(UsersService)
    usersService,
  ) {
    this.usersService = usersService;
  }

  @Post()
  create(@Body() createUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

export default UsersController;
