import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enum/taskStatus';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeStatusDto {
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
