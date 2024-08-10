import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  cep: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  street: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  number: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  complement: string;
}
