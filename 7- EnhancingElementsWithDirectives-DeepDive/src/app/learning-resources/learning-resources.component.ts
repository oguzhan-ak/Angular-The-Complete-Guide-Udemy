import { Component } from '@angular/core';
import { LogDirective } from '../log.directive';
import { SafeLinkDirective } from '../safe-link.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [SafeLinkDirective, LogDirective],
})
export class LearningResourcesComponent {}
