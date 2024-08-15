import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTaskDto';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { SearchDto } from './dto/requestSearchDto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}
  public async create(createTask: CreateTaskDto) {
    try {
      const user = await this.userService.findByID(createTask.userId);

      const task = new Task();

      task.user = user;
      task.title = createTask.title;
      task.status = createTask.status;
      task.limitDate = createTask.limitDate;
      task.description = createTask.description;

      return await this.taskRepository.save(task);
    } catch (error) {
      throw error;
    }
  }

  public async findAllTasks(userId: string): Promise<Task[]> {
    try {
      return this.taskRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: string): Promise<Task> {
    try {
      const task = this.taskRepository.findOne({
        where: { id: id },
      });
      if (!task) {
        throw new NotFoundException('Task não encontrada');
      }
      return task;
    } catch (error) {}
  }
  public async update(id: string, updates: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.findOne(id);
      Object.assign(task, updates);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.taskRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async favorite(id: string): Promise<boolean> {
    try {
      const task = await this.findOne(id);
      task.favorite = !task.favorite;
      await this.taskRepository.save(task);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async search(userId: string, query: SearchDto): Promise<Task[]> {
    try {
      const { title, status, favorite, sortBy, sortOrder } = query;

      const queryBuilder = this.taskRepository
        .createQueryBuilder('t')
        .leftJoinAndSelect('t.user', 'user')
        .where('t.userId = :userId', { userId });
      if (title) {
        queryBuilder.andWhere('t.title LIKE :title', { title: `%${title}%` });
      }
      if (status) {
        queryBuilder.andWhere('t.status = :status', { status });
      }
      if (favorite !== undefined) {
        queryBuilder.andWhere('t.favorite = :favorite', { favorite });
      }

      if (sortBy) {
        queryBuilder.orderBy(
          `t.${sortBy}`,
          sortOrder === 'DESC' ? 'DESC' : 'ASC',
        );
      }

      return await queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }
}
