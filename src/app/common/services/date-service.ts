import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getDaysOfMonth(period: Date): Date[] {
    const year = period.getFullYear();
    const month = period.getMonth();

    const numberOfDays = new Date(year, month + 1, 0, 0).getDate();

    return Array.from({ length: numberOfDays }, (_, index) => new Date(year, month, index + 1, 0));
  }

  getFirstColumn(period: Date): number {
    const firstDay = new Date(period.getFullYear(), period.getMonth(), 1);

    // Lundi = 1, Dimanche = 7
    return ((firstDay.getDay() + 6) % 7) + 1;
  }

  toCalendarDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
