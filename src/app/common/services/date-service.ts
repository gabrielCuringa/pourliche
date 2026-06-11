import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getDaysOfMonth(period: Date): Date[] {
    const year = period.getFullYear();
    const month = period.getMonth();

    const numberOfDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: numberOfDays }, (_, index) => new Date(year, month, index + 1));
  }

  getFirstColumn(period: Date): number {
    const firstDay = new Date(period.getFullYear(), period.getMonth(), 1);

    // Lundi = 1, Dimanche = 7
    return ((firstDay.getDay() + 6) % 7) + 1;
  }
}
