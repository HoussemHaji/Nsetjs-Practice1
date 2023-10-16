import {
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidationArguments,
} from 'class-validator';
import {
  emptyErrorMessage,
  maxLengthError,
  minLengthError,
} from 'src/common/errors';

export class AddTodoDto {
  @IsString()
  @IsNotEmpty(emptyErrorMessage({ targetName: 'name' } as ValidationArguments))
  @Min(3, minLengthError(3))
  @Max(10, maxLengthError(10))
  name: string;

  @IsString()
  @IsNotEmpty()
  @Min(10, minLengthError(10))
  description: string;
}
