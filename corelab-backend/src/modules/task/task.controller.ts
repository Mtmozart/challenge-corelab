import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateTaskDto } from './dto/createTaskDto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { ChangeStatusDto } from './dto/changeStatusDto';
import { SearchDto } from './dto/requestSearchDto';

@ApiTags('task')
@Controller('task')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth('JWT-auth')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  @Roles('client')
  async create(@Body() createTask: CreateTaskDto) {
    return await this.taskService.create(createTask);
  }
  @Get(':id')
  @Roles('client')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(id);
  }
  @Get('findAll/:userId')
  @Roles('client')
  async findAll(@Param('userId') id: string) {
    return await this.taskService.findAllTasks(id);
  }

  @Put(':id')
  @Roles('client')
  async update(@Param('id') id: string, @Body() updates: UpdateTaskDto) {
    return await this.taskService.update(id, updates);
  }
  @Delete(':id')
  @Roles('client')
  async delete(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }

  @Patch('change-status/:id')
  @Roles('client')
  async updatesStatus(
    @Param('id') id: string,
    @Body() changeStatus: ChangeStatusDto,
  ) {
    return await this.taskService.changeStatus(id, changeStatus);
  }

  @Patch('favorite/:id')
  @Roles('client')
  async favorite(@Param('id') id: string) {
    return await this.taskService.favorite(id);
  }

  @Get('search/:userId')
  @Roles('client')
  async search(@Param('userId') userId: string, @Query() query: SearchDto) {
    return await this.taskService.search(userId, query);
  }
}
