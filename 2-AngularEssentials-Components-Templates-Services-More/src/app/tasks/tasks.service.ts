import { Injectable } from '@angular/core';
import { NewTaskData, Task } from './task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: any[] = [
    {
      id: '1',
      userId: 'u1',
      title: 'Task 1',
      summary: 'Summary for Task 1',
      dueDate: '2023-10-01',
    },
    {
      id: '2',
      userId: 'u2',
      title: 'Task 2',
      summary: 'Summary for Task 2',
      dueDate: '2023-10-01',
    },
  ];

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    const newTask: Task = {
      id: Math.random().toString(),
      userId,
      ...taskData,
    };
    this.tasks.push(newTask);
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
