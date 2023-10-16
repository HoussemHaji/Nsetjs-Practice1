import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SearchTodoDto } from './dto/serach-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('search/:id')
  async findTodoById(@Param('id') id: number) {
    return await this.todoService.findById(id);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto) {
    return this.todoService.addTodo(newTodo);
  }

  @Post('add/v2')
  async addTodoV2(@Body() newTodo: AddTodoDto) {
    return await this.todoService.addTodoV2(newTodo);
  }

  @Put(':id')
  async updateTodo(@Param('id') id, @Body() newTodo: UpdateTodoDto) {
    return await this.todoService.updateTodo(id, newTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Delete('/soft/:id')
  async softDeleteTodo(@Param('id') id: number) {
    return this.todoService.softDeleteTodo(id);
  }

  @Get('restore/:id')
  async restoreTodo(@Param('id') id: number) {
    return this.todoService.restoreTodo(id);
  }

  @Get('status')
  async getStatusCount() {
    return this.todoService.getStatusCount();
  }

  @Get('/count/:status')
  async countTodoByStatus(@Param('status') status: string) {
    return this.todoService.countTodoByStatus(status);
  }
  @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get('/search')
  async searchTodo(@Query() param: SearchTodoDto) {
    return await this.todoService.searchTodo(param);
  }
  @Get('/all/paginated')
  async getAllTodosPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return await this.todoService.getAllTodosPaginated(page, limit);
  }
}
