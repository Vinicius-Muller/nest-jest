import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create({
        ...createUserDto,
        first_name: createUserDto.firstName,
        sir_name: createUserDto.sirName,
        date_initial: createUserDto.dateInitial,
        date_end: createUserDto.dateEnd,
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.findOneByOrFail({ id: id });

      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.usersRepository.findOneByOrFail({ id: id });

      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
