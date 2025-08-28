import { inject, Injectable, signal } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
  
})
export class TasksService {
  private loggingService = inject(LoggingService);
  private tasks = signal<Task[]>([]);

  addTask(task: { title: string; description: string }) {
    this.tasks.update((tasks) => [
      ...tasks,
      { ...task, id: Math.random().toString(), status: 'OPEN' },
    ]);
    this.loggingService.log(`Task added: ${task.title}`);
  }

  allTasks = this.tasks.asReadonly();

  updateTaskStatus(taskId: string, status: 'OPEN' | 'IN_PROGRESS' | 'DONE') {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
    this.loggingService.log(
      `Task status updated: ${taskId}, Status: ${status}`
    );
  }
}
