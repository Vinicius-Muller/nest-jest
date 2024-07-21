import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  sirName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsArray()
  permissions: string[];

  @IsNotEmpty()
  @IsString()
  dateInitial: string;

  @IsNotEmpty()
  @IsString()
  dateEnd: string;
}
