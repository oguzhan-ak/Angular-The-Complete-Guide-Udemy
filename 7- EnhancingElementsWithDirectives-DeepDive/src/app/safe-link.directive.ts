import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {}

  @HostListener('click', ['$event'])
  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'Do you really want to leave this page?',
    );
    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}
