import { IsEAN, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  permissions: string[];

  @IsNotEmpty()
  dateInitial: Date;

  @IsNotEmpty()
  dateEnd: Date;
}
