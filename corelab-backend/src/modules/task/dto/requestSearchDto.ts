import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enum/taskStatus';
import { Transform } from 'class-transformer';

export class SearchDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'title' })
  title?: string;

  @ApiProperty({ default: true })
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  @IsOptional()
  favorite?: boolean;

  @ApiProperty({
    description: 'Status da tarefa [created, pending, in_progress, cancelled]',
    enum: TaskStatus,
    default: TaskStatus.CREATED,
  })
  @IsEnum(TaskStatus, {
    message: 'O status deve ser um valor válido de TaskStatus.',
  })
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ enum: ['favorite', 'status'] })
  sortBy?: 'favorite' | 'status';

  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiPropertyOptional({ description: "'DESC' or 'ASC'" })
  sortOrder?: 'ASC' | 'DESC';
}
