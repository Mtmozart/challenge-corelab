import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskStatus } from '../enum/taskStatus';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
@Index(['title', 'status'])
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  limitDate: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.CREATED,
  })
  status: TaskStatus;
  @Column({ type: 'boolean', default: false })
  favorite: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
