import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { type Task } from './task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  task = input.required<Task>();
  private tasksService = inject(TasksService);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload',
      queryParamsHandling: 'preserve',
    });
  }
}
