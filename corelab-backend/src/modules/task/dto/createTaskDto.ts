import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enum/taskStatus';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Usuário',
  })
  @IsString({ message: 'O id deve ser uma string.' })
  @IsNotEmpty({ message: 'O id não pode estar vazio.' })
  @IsUUID('4', { message: 'ID deve ser um UUID válido' })
  userId: string;

  @ApiProperty({
    description: 'Título da tarefa',
  })
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  @MaxLength(100, { message: 'A o título não pode passar de 100 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
  })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @MaxLength(250, { message: 'A descrição não pode passar de 250 caracteres' })
  description: string;

  @ApiProperty({
    description: 'Data limite para a tarefa',
  })
  @IsString({ message: 'A data limite deve ser uma string.' })
  @IsNotEmpty({ message: 'A data limite não pode estar vazia.' })
  limitDate: Date;

  @ApiProperty({
    description:
      'Status da tarefa [created, pending, in_progress, in_progress e cancelled]',
    enum: TaskStatus,
    default: TaskStatus.CREATED,
  })
  @IsEnum(TaskStatus, {
    message: 'O status deve ser um valor válido de TaskStatus.',
  })
  @IsNotEmpty({ message: 'O status não pode estar vazio.' })
  status: TaskStatus;
}
