import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UpdateAddressDto } from './updateAddressDto';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;

  @ApiProperty({ type: () => UpdateAddressDto })
  address: UpdateAddressDto;
}
