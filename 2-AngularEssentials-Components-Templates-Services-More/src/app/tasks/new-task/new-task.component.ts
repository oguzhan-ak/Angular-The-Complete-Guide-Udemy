import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) userId!: string;
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  constructor(private tasksService: TasksService) {}

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    const newTask: NewTaskData = {
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate,
    };
    this.tasksService.addTask(newTask, this.userId);
    this.close.emit();
  }
}
