import { Component, input } from '@angular/core';
import { CalendarDay } from '../calendar-day/calendar-day';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  imports: [ButtonModule],
  standalone: true,
})
export class Calendar {
  month = input<Date>();
}
