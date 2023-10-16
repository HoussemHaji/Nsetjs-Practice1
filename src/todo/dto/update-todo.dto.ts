import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';
import { maxLengthError, minLengthError } from 'src/common/errors';

import { todoStatusEnum } from 'src/Enums/todo-Status.enum';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @Min(3, minLengthError(3))
  @Max(10, maxLengthError(10))
  name: string;

  @IsString()
  @IsOptional()
  @Min(10, minLengthError(10))
  description: string;

  @IsEnum(todoStatusEnum)
  status: todoStatusEnum;
}
