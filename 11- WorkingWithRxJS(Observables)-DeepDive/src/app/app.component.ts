import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  customInterval$ = new Observable<number>((subscriber) => {
    let count = 0;
    const intervalId = setInterval(() => {
      // subscriber.error(new Error('Custom error'));
      subscriber.next(count++);
      if (count > 4) {
        clearInterval(intervalId);
        subscriber.complete();
      }
    }, 1000);
  });

  constructor() {
    // effect(() => {
    //   console.log(this.clickCount());
    // });
  }

  ngOnInit(): void {
    // const subscription = interval(1000)
    //   .pipe(map((value) => value * 2))
    //   .subscribe({
    //     next: (value) => {
    //       console.log(value);
    //     },
    //   });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
    // const subscription = this.clickCount$.subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   },
    // });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });

    const subscription = this.customInterval$.subscribe({
      next: (value) => {
        console.log(value);
      },
      complete: () => {
        console.log('Custom interval completed');
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick(): void {
    this.clickCount.update((count) => count + 1);
  }
}
