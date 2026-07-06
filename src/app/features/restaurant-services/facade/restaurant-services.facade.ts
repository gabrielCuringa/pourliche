import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { RestaurantServicesService } from '../services/restaurant-services.service';
import {
  CreateRestaurantServiceDto,
  RestaurantServiceDto,
  Shift,
} from '../../../api/restaurant-services/restaurant-services.dto';
import { DateService } from '../../../common/services/date-service';

type State = { isUpserting: boolean; currentPeriod?: Date };

@Injectable({
  providedIn: 'root',
})
export class RestaurantServicesFacade {
  private dateService = inject(DateService);
  private service = inject(RestaurantServicesService);

  readonly state = signal<State>({
    isUpserting: false,
  });

  readonly currentPeriod = computed(() => this.state().currentPeriod);

  readonly services = resource<RestaurantServiceDto[] | null, { currentPeriod?: Date }>({
    params: () => {
      return {
        currentPeriod: this.currentPeriod(),
      };
    },
    loader: async ({ params }) => {
      if (!params.currentPeriod) return null;
      return this.service.getServicesForPeriod(
        this.dateService.toCalendarDate(
          new Date(params.currentPeriod.getFullYear(), params.currentPeriod.getMonth(), 1),
        ),
        this.dateService.toCalendarDate(
          new Date(params.currentPeriod.getFullYear(), params.currentPeriod.getMonth() + 1, 1),
        ),
      );
    },
  });

  setPeriod(date: Date) {
    this.state.update((s) => {
      return { ...s, currentPeriod: date };
    });
  }

  async upsert(dto: CreateRestaurantServiceDto) {
    this.state.update((s) => {
      return { ...s, isUpserting: true };
    });
    try {
      await this.service.upsertService(dto);
      this.services.reload();
    } finally {
      this.state.update((s) => {
        return { ...s, isUpserting: false };
      });
    }
  }

  getServiceByDate(date: Date, shift: Shift) {
    return this.services
      .value()
      ?.find(
        (service) =>
          service.service_date === this.dateService.toCalendarDate(date) && service.shift === shift,
      );
  }
}
