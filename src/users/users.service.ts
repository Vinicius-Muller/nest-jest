import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  parseDate(date) {
    const [day, month, year] = date.split('/');
    return year + '-' + month + '-' + day;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const permissionsMatched = await this.permissionsRepository.find({
        where: {
          id: In(createUserDto.permissions),
        },
      });

      const user = this.usersRepository.create({
        ...createUserDto,
        first_name: createUserDto.firstName,
        sir_name: createUserDto.sirName,
        date_initial: new Date(this.parseDate(createUserDto.dateInitial)),
        date_end: new Date(this.parseDate(createUserDto.dateEnd)),
        permissions: permissionsMatched,
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find({ relations: ['permissions'] });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOne({
        where: { id: id },
        relations: ['permissions'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.findOneByOrFail({ id: id });

      const permissionsMatched = await this.permissionsRepository.find({
        where: {
          id: In(updateUserDto.permissions),
        },
      });

      const user = this.usersRepository.create({
        ...updateUserDto,
        first_name: updateUserDto.firstName,
        sir_name: updateUserDto.sirName,
        date_initial: new Date(this.parseDate(updateUserDto.dateInitial)),
        date_end: new Date(this.parseDate(updateUserDto.dateEnd)),
        permissions: permissionsMatched,
      });

      return await this.usersRepository.update(id, user);
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
