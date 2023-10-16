import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { Todo } from './todo';
import { AddTodoDto } from './dto/add-todo.dto';
import { todoStatusEnum } from 'src/Enums/todo-Status.enum';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SearchTodoDto } from './dto/serach-todo.dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepo: Repository<TodoEntity>,
  ) {}

  async findById(id: number): Promise<Partial<TodoEntity>> {
    const todo = await this.todoRepo.findOneBy({ id: id });

    if (!todo) throw new NotFoundException('Todo Not Found');
    else return todo;
  }

  addTodo(newTodo: AddTodoDto): Todo {
    const todo = new Todo();
    const { name, description } = newTodo;
    todo.name = name;
    todo.description = description;
    if (this.todos.length) {
      todo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      todo.id = 1;
    }
    todo.createdAt = new Date();
    todo.status = todoStatusEnum.WAITING;
    this.todos.push(todo);

    return todo;
  }

  async addTodoV2(newTodo: AddTodoDto): Promise<Partial<TodoEntity>> {
    const todo = this.todoRepo.create(newTodo);
    return await this.todoRepo.save(todo);
  }

  async updateTodo(
    id: number,
    newTodo: UpdateTodoDto,
  ): Promise<Partial<TodoEntity>> {
    const todo = await this.findById(id);
    todo.description = newTodo.description ?? newTodo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    this.todoRepo.save(todo);
    return todo;
  }

  async deleteTodo(id: number): Promise<Partial<TodoEntity>> {
    const todo = await this.findById(id);
    await this.todoRepo.delete(id);
    return todo;
  }

  async softDeleteTodo(id: number): Promise<Partial<TodoEntity>> {
    const todo = await this.findById(id);
    await this.todoRepo.softDelete(id);
    return todo;
  }

  async restoreTodo(id: number) {
    const todo = this.todoRepo.find({ where: { id }, withDeleted: true });
    if (!todo) throw new NotFoundException('Todo not found');
    else {
      return await this.todoRepo.restore(id);
    }
  }

  async getStatusCount() {
    const activeStatus = await this.todoRepo.count({
      where: { status: todoStatusEnum.ACTIVE },
    });
    const waitingStatus = await this.todoRepo.count({
      where: { status: todoStatusEnum.WAITING },
    });
    const finishedStatus = await this.todoRepo.count({
      where: { status: todoStatusEnum.FINISHED },
    });
    console.log('Hello');
    return {
      active: activeStatus,
      waiting: waitingStatus,
      done: finishedStatus,
    };
  }

  async countTodoByStatus(status: string) {
    return await this.todoRepo.count({ where: { status: status } });
  }

  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepo.find();
  }

  async searchTodo(param: SearchTodoDto) {
    const queryBuilder = this.todoRepo.createQueryBuilder('todo');

    if (param.status) {
      queryBuilder.andWhere('todo.status = :status', { status: param.status });
    }

    if (param.criteria) {
      queryBuilder.andWhere(
        '(todo.name LIKE :criteria OR todo.description LIKE :criteria)',
        { criteria: `%${param.criteria}%` },
      );
    }

    return await queryBuilder.getMany();
  }

  async getAllTodosPaginated(page = 1, limit = 10) {
    const todos = await this.todoRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      page,
      limit,

      data: todos,
    };
  }
}
