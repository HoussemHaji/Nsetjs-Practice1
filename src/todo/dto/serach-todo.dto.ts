import { IsOptional } from 'class-validator';
import { todoStatusEnum } from 'src/Enums/todo-Status.enum';

export class SearchTodoDto {
  @IsOptional()
  criteria: string;
  @IsOptional()
  status: todoStatusEnum;
}
