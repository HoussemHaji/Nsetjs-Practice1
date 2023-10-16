import { todoStatusEnum } from 'src/Enums/todo-Status.enum';
import { TimeStampEntities } from 'src/common/time-Stamp.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoEntity extends TimeStampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: todoStatusEnum,
    default: todoStatusEnum.WAITING,
  })
  status: string;
}
