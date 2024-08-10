import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CreateAddressDto } from './createAddressDto';
import { TypeUser } from '../../enum/typeUserEnum';

export class CreateUserClientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ type: () => CreateAddressDto })
  address: CreateAddressDto;

  @ApiHideProperty()
  type: TypeUser = TypeUser.CLIENT;
}
