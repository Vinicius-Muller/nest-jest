import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';

const permissionsList: Permission[] = [
  new Permission({
    name: 'teste.create',
  }),
];

describe('PermissionsService', () => {
  let service: PermissionsService;
  let permissionRepository: Repository<Permission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getRepositoryToken(Permission),
          useValue: {
            find: jest.fn().mockResolvedValue(permissionsList),
            create: jest.fn().mockResolvedValue(permissionsList[0]),
            save: jest.fn().mockResolvedValue(permissionsList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    permissionRepository = module.get<Repository<Permission>>(
      getRepositoryToken(Permission),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(permissionRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return all permissions array', async () => {
      const results = await service.findAll();

      expect(results).toEqual(permissionsList);
      expect(permissionRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Should return an error when trying to return the permissions array', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      expect(service.findAll).rejects.toThrow(new Error());
    });
  });

  describe('create', () => {
    it('should create and return a permission', async () => {
      const newPermissionsDto: CreatePermissionDto = {
        name: 'teste',
      };

      const savedPermission = await service.create(newPermissionsDto);

      expect(savedPermission).toEqual(permissionsList[0]);
      expect(permissionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should return an error when trying to save a permission', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(service.create).rejects.toThrow(new Error());
    });
  });
});
