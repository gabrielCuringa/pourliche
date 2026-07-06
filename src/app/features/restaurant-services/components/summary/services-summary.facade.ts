import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { EmployeesService } from '../../../employees/services/employees-service';
import { DateService } from '../../../../common/services/date-service';
import { EmployeeMonthlyTips } from '../../../../api/employees/dtos/employees.dto';

type State = { currentPeriod?: Date };

@Injectable({
  providedIn: 'root',
})
export class ServicesSummaryFacade {
  readonly employeeService = inject(EmployeesService);
  readonly dateService = inject(DateService);

  readonly state = signal<State>({});
  readonly currentPeriod = computed(() => this.state().currentPeriod);

  readonly summary = resource<EmployeeMonthlyTips[], { currentPeriod?: Date }>({
    params: () => {
      return { currentPeriod: this.currentPeriod() };
    },
    loader: async ({ params }) => {
      if (!params.currentPeriod) return [];
      return this.employeeService.getEmployeesServicesSummary(
        this.dateService.toCalendarDate(
          new Date(params.currentPeriod.getFullYear(), params.currentPeriod.getMonth(), 1),
        ),
      );
    },
  });

  setPeriod(date: Date) {
    this.state.update((s) => {
      return { ...s, currentPeriod: date };
    });
  }
}
