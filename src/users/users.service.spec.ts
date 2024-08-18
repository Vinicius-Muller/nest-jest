import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Permission } from 'src/permissions/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const permissionsList: Permission[] = [
  new Permission({
    name: 'teste',
    user: null,
  }),
];

const userList: User[] = [
  new User({
    first_name: 'teste',
    sir_name: 'sobrenome',
    email: 'teste@gmail.com',
    permissions: [
      new Permission({
        name: 'service',
        user: null,
      }),
    ],
    date_initial: new Date(),
    date_end: new Date(),
  }),
];

describe('UsersService', () => {
  let service: UsersService;
  let permission: PermissionsService;
  let usersRepository: Repository<User>;
  let permissionRepository: Repository<Permission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(userList[0]),
            save: jest.fn().mockResolvedValue(userList[0]),
            find: jest.fn().mockResolvedValue(userList),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            findOneByOrFail: jest.fn().mockResolvedValue(userList[0]),
            update: jest.fn().mockResolvedValue(userList[0]),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        PermissionsService,
        {
          provide: getRepositoryToken(Permission),
          useValue: {
            find: jest.fn().mockResolvedValue(permissionsList),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    permission = module.get<PermissionsService>(PermissionsService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    permissionRepository = module.get<Repository<Permission>>(
      getRepositoryToken(Permission),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(permission).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(permissionRepository).toBeDefined();
  });

  describe('parseDate', () => {
    it('should parse de date do a valid format', () => {
      const date = service.parseDate('00/00/0000');

      expect(date).toEqual('0000-00-00');
    });
  });

  describe('create', () => {
    it('should search a permissions that matchs the id and create a user', async () => {
      const matchPermission = await permissionRepository.find({
        where: {
          id: In(['id']),
        },
      });

      const newUser: CreateUserDto = {
        firstName: userList[0].first_name,
        sirName: userList[0].sir_name,
        email: userList[0].email,
        permissions: ['1'],
        dateInitial: '01-01-2024',
        dateEnd: '01-01-2024',
      };
      const createdUser = await service.create(newUser);

      expect(matchPermission).toEqual(permissionsList);
      expect(createdUser).toEqual(userList[0]);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return an error if the request fail', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      const newUser: CreateUserDto = {
        firstName: userList[0].first_name,
        sirName: userList[0].sir_name,
        email: userList[0].email,
        permissions: ['1'],
        dateInitial: '01-01-2024',
        dateEnd: '01-01-2024',
      };

      expect(service.create(newUser)).rejects.toThrow(new Error());
    });
  });

  describe('findAll', () => {
    it('should find all users and return into an array', async () => {
      const users = await service.findAll();

      expect(users).toEqual(userList);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an error while trying to get all users', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      expect(service.findAll).rejects.toThrow(new Error());
    });
  });

  describe('findOne', () => {
    it('should find one user and return an object', async () => {
      const matchUser = await service.findOne('1');

      expect(matchUser).toEqual(userList[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an error while trying to get one user', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.findOne).rejects.toThrow(new Error());
    });
  });

  describe('update', () => {
    it('should update an user', async () => {
      const savedUsers = await usersRepository.find();

      const updatedUserDto: UpdateUserDto = {
        firstName: userList[0].first_name,
        sirName: userList[0].sir_name,
        email: userList[0].email,
        permissions: ['1'],
        dateInitial: String(userList[0].date_initial),
        dateEnd: String(userList[0].date_end),
      };

      const updatedUser = await service.update(
        savedUsers[0].id,
        updatedUserDto,
      );

      expect(updatedUser).toEqual(userList[0]);
    });

    it('should return an error whem trying to update a user', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(service.update).rejects.toThrow(new Error());
    });
  });

  describe('delete', () => {
    it('should delete an user', async () => {
      const deleteUser = await service.remove('1');

      expect(deleteUser).toEqual(undefined);
    });

    it('should throw an error when trying to delete an user', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      expect(service.remove).rejects.toThrow(new Error());
    });
  });
});
