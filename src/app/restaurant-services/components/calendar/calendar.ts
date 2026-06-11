import { Component, inject, Injectable, signal, effect, computed } from '@angular/core';
import { CalendarDay } from '../calendar-day/calendar-day';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { DateService } from '../../../common/services/date-service';

@Injectable({ providedIn: 'root' })
export class CalendarState {
  dateService = inject(DateService);

  private readonly _period = signal(new Date());
  readonly period = this._period.asReadonly();

  readonly days = computed<Date[]>(() => {
    const period = this.period();

    return this.dateService.getDaysOfMonth(period);
  });

  reset(): void {
    this._period.set(new Date());
  }

  previous(): void {
    this._period.update((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1));
  }

  next(): void {
    this._period.update((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1));
  }
}

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  imports: [ButtonModule, DatePipe, CalendarDay],
  standalone: true,
})
export class Calendar {
  state = inject(CalendarState);
  weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  getGridColumnStart(date: Date): number {
    return ((date.getDay() + 6) % 7) + 1;
  }
}
