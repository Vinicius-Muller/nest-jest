import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';

const permissionsList: Permission[] = [
  new Permission({
    name: 'teste.create',
  }),
];

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let service: PermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: PermissionsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(permissionsList),
            create: jest.fn().mockResolvedValue(permissionsList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    service = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should find all permissions and return an array', async () => {
      const results = await controller.findAll();

      expect(results).toEqual(permissionsList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('Should return and error when trying to return the permissions array', async () => {
      jest.spyOn(controller, 'findAll').mockRejectedValueOnce(new Error());

      expect(controller.findAll).rejects.toThrow(new Error());
    });
  });

  describe('create', () => {
    it('Should create a permission and return', async () => {
      const newPermissionsDto: CreatePermissionDto = {
        name: permissionsList[0].name,
      };

      const createdPermission = await controller.create(newPermissionsDto);

      expect(createdPermission).toEqual(permissionsList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(newPermissionsDto);
    });

    it('Should return an error when trying to create a permission', async () => {
      jest.spyOn(controller, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create).rejects.toThrow(new Error());
    });
  });
});
