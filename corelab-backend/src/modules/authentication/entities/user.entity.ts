import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { TypeUser } from '../enum/typeUserEnum';

@Entity()
@Index(['email', 'username'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Address, (address) => address.id, { eager: true })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @Column('simple-array')
  roles: string[];

  @Column({
    type: 'enum',
    enum: TypeUser,
    default: TypeUser.CLIENT,
  })
  type: TypeUser;
}
