import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  log(message: string) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${message}`);
  }
}
