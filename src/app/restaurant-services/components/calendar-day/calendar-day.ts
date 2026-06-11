import { Component, input } from '@angular/core';
import { ServiceComponent, Shift } from '../service/service';

@Component({
  selector: 'calendar-day',
  templateUrl: 'calendar-day.html',
  imports: [ServiceComponent],
})
export class CalendarDay {
  readonly day = input<Date>();
  readonly today = new Date();
  readonly shifts = [Shift.lunch, Shift.dinner];

  isToday(date?: Date): boolean {
    return this.day()?.toDateString() === new Date().toDateString();
  }
}
