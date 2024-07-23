import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { CreateUserDto } from './dto/create-user.dto';

const userMock: CreateUserDto = {
  firstName: 'teste',
  sirName: 'teste',
  email: 'email@gmail.com',
  permissions: ['id'],
  dateInitial: '00',
  dateEnd: '00',
};

const userList: User[] = [
  new User({
    first_name: 'teste',
    sir_name: 'unit',
    email: 'email@gmail',
    permissions: [
      new Permission({
        name: 'service',
      }),
    ],
    date_initial: new Date(),
    date_end: new Date(),
  }),
];

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userList),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            create: jest.fn().mockResolvedValue(userList[0]),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save and return a user', async () => {
      const result = await controller.create(userMock);

      expect(result).toEqual(userList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(userMock);
    });

    it('should throw an error', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create(userMock)).rejects.toThrow(new Error());
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const list = await controller.findAll();

      expect(list).toEqual(userList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      expect(service.findAll).rejects.toThrow(new Error());
    });
  });

  describe('findOne', () => {
    it('should return a single user search by id', async () => {
      const result = await controller.findOne('id');

      expect(result).toEqual(userList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith('id');
    });

    it('should return an error', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.findOne).rejects.toThrow(new Error());
    });
  });
});
