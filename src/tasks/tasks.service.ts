import { Injectable, NotFoundException } from '@nestjs/common';
// import * as uuid from 'uuid/v1'; // This was install via npm (npm install --save uuid)
// import { Task } from '../../dist/tasks/task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   // const { status, search } = filterDto;

  //   // let tasks = this.getAllTasks();

  //   // if (status) {
  //   //   tasks = tasks.filter(t => t.status === status);
  //   // }

  //   // if (search) {
  //   //   tasks = tasks.filter(
  //   //     t => t.title.includes(search) || t.description.includes(search),   this comma is stupid
  //   //   );
  //   // }

  //   // return tasks;

  //   // udemy way above

  //   // gogo way below
  //   return this.getAllTasks().filter(
  //     t =>
  //       (!filterDto.status || t.status === filterDto.status) &&
  //       (!filterDto.search ||
  //         t.title.includes(filterDto.search) ||
  //         t.description.includes(filterDto.search)),
  //   );
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`); // Backtick
    }

    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }

  async deleteTaskWithVoid(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find(t => t.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);   // Backtick
  //   }

  //   return found;
  // }

  // //   createTask(title: string, description: string): Task {
  // //     const task: Task = {
  // //       id: uuid(),
  // //       title,
  // //       description,
  // //       status: TaskStatus.OPEN,
  // //     };

  // //     this.tasks.push(task);
  // //     return task;
  // //   }

  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;

  //   const task: Task = {
  //     id: uuid(),
  //     // title: createTaskDTO.title,
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter(t => t.id !== id);
  // }

  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // updateTaskTitleByParam(id: string, title: string): Task {
  //   const task = this.getTaskById(id);
  //   task.title = title;
  //   return task;
  // }
}
