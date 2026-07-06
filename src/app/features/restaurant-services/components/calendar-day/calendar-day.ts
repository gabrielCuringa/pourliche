import { Component, inject, input } from '@angular/core';
import { ServiceComponent } from '../service/service';
import {
  RestaurantServiceDto,
  Shift,
} from '../../../../api/restaurant-services/restaurant-services.dto';
import { RestaurantServicesFacade } from '../../facade/restaurant-services.facade';
import { DateService } from '../../../../common/services/date-service';

@Component({
  selector: 'calendar-day',
  templateUrl: 'calendar-day.html',
  imports: [ServiceComponent],
})
export class CalendarDay {
  readonly restaurantServicesFacade = inject(RestaurantServicesFacade);
  readonly dateService = inject(DateService);

  readonly day = input.required<Date>();
  readonly today = new Date();
  readonly shifts = ['LUNCH', 'DINNER'] as Shift[];

  isToday(): boolean {
    return this.day()?.toDateString() === new Date().toDateString();
  }

  buildService(date: Date, shift: Shift): RestaurantServiceDto {
    const existingService = this.restaurantServicesFacade.getServiceByDate(date, shift);
    if (!existingService) {
      return {
        created_at: '',
        service_date: this.dateService.toCalendarDate(date),
        service_id: -1,
        shift: shift,
        tips: 0,
        employee_ids: [],
      };
    }
    return existingService;
  }
}
