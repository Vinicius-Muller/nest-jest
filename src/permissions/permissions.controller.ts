import { Body, Controller, Get, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiTags('permissions')
  @ApiResponse({
    status: 200,
    description: 'Return all permissions',
    schema: {
      type: 'Array',
      items: {
        properties: {
          id: { type: 'string', example: 'uuid' },
          name: { type: 'string', example: 'service.create' },
          user: { type: 'object', example: {} },
        },
      },
    },
  })
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @ApiTags('permissions')
  @ApiResponse({
    status: 200,
    description: 'Return the permission created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'uuid' },
        name: { type: 'string', example: 'service.create' },
        user: { type: 'object', example: {} },
      },
    },
  })
  @ApiBody({
    required: true,
    description: 'Create a permission',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'service.create' },
        user: { type: 'object', example: {} },
      },
    },
  })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }
}
