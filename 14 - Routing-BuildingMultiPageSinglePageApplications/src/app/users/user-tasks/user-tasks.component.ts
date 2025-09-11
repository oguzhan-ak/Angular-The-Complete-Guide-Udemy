import { Component, inject, input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  private activatedRoute = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       // this.userName = data['userName']; // solution 2
  //     },
  //   });
  // }
  // userId = input.required<string>();  // solution 1
  // message = input.required<string>(); // solution 1

  // private usersService = inject(UsersService);
  // userName = computed(
  //   () =>
  //     this.usersService.users.find((u) => u.id === this.userId)?.name ??
  //     'Unknown User'
  // ); // solution 1

  // userName: string | undefined; // solution 2

  // userId: string | null = null; // solution 2

  // ngOnInit(): void {
  //   // solution 2
  //   // console.log(this.activatedRoute.snapshot);
  //   // console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
  //   this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name ?? 'Unknown User';
  //     },
  //   });
  // }

  userName = input.required<string>();
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name ?? 'Unknown User';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "' s Tasks";
};
