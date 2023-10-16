import { todoStatusEnum } from 'src/Enums/todo-Status.enum';

export class Todo {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: todoStatusEnum;
}
