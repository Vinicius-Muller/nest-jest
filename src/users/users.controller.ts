import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @Post()
  @ApiBody({
    required: true,
    description: 'Create the user',
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'nome' },
        sirName: { type: 'string', example: 'sobrenome' },
        email: { type: 'string', example: 'teste@gmail.com' },
        dateInitial: { type: 'date', example: new Date() },
        dateEnd: { type: 'date', example: new Date() },
        permissions: { type: 'array', example: [] },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Return created user',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'uuid' },
        first_name: { type: 'string', example: 'nome' },
        sir_name: { type: 'string', example: 'sobrenome' },
        email: { type: 'string', example: 'teste@gmail.com' },
        date_initial: { type: 'date', example: new Date() },
        date_end: { type: 'date', example: new Date() },
        permissions: { type: 'array', example: [] },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('users')
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'string', example: 'uuid' },
          first_name: { type: 'string', example: 'nome' },
          sir_name: { type: 'string', example: 'sobrenome' },
          email: { type: 'string', example: 'teste@gmail.com' },
          date_initial: { type: 'date', example: new Date() },
          date_end: { type: 'date', example: new Date() },
          permissions: { type: 'array', example: [] },
        },
      },
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('users')
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of the user',
    example: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Return user by id',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'uuid' },
        first_name: { type: 'string', example: 'nome' },
        sir_name: { type: 'string', example: 'sobrenome' },
        email: { type: 'string', example: 'teste@gmail.com' },
        date_initial: { type: 'date', example: new Date() },
        date_end: { type: 'date', example: new Date() },
        permissions: { type: 'array', example: [] },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiTags('users')
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of the user to update',
    example: 'uuid',
  })
  @ApiBody({
    required: true,
    description: 'Update the user',
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'nome' },
        sirName: { type: 'string', example: 'sobrenome' },
        email: { type: 'string', example: 'teste@gmail.com' },
        dateInitial: { type: 'date', example: new Date() },
        dateEnd: { type: 'date', example: new Date() },
        permissions: { type: 'array', example: [] },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Return updated user',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'uuid' },
        first_name: { type: 'string', example: 'nome' },
        sir_name: { type: 'string', example: 'sobrenome' },
        email: { type: 'string', example: 'teste@gmail.com' },
        date_initial: { type: 'date', example: new Date() },
        date_end: { type: 'date', example: new Date() },
        permissions: { type: 'array', example: [] },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiTags('users')
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id of the user that is going to be deleted',
    example: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Should delete a user and return a void',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
