import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Permission } from 'src/permissions/entities/permission.entity';
import { In, Repository } from 'typeorm';

const permissionsList: Permission[] = [
  new Permission({
    name: 'teste',
    user: null,
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
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneByOrFail: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
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

  describe('create', () => {
    it('should search a permissions that matchs the id', async () => {
      const matchPermission = await permissionRepository.find({
        where: {
          id: In(['id']),
        },
      });

      expect(matchPermission).toEqual(permissionsList);
    });
  });
});
