import { Component, input } from '@angular/core';

@Component({
  selector: 'calendar-day',
  templateUrl: 'calendar-day.html',
})
export class CalendarDay {
  readonly day = input<number>();
}
