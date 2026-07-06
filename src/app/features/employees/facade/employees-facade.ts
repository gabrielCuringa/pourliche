import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { EmployeesService } from '../services/employees-service';
import { EmployeeDto } from '../../../api/employees/dtos/employees.dto';
import { ButtonDirective } from 'primeng/button';

@Injectable({
  providedIn: 'root',
})
export class EmployeesFacade {
  private employeesService = inject(EmployeesService);

  readonly employees = resource<EmployeeDto[] | null, {}>({
    loader: () => this.employeesService.getEmployees(),
  });

  readonly shouldShowLoader = computed(
    () => this.employees.isLoading() && !this.employees.value()?.length,
  );

  readonly isCreating = signal(false);
  readonly isDeleting = signal(false);
  readonly isUpdating = signal(false);

  async createEmployee(name: string) {
    this.isCreating.set(true);
    const employee = await this.employeesService.createEmployee(name);
    this.employees.reload();
    this.isCreating.set(false);
    return employee;
  }

  async deleteEmployee(id: number) {
    this.isDeleting.set(true);
    await this.employeesService.deleteEmployee(id);
    this.employees.reload();
    this.isDeleting.set(false);
  }

  async updateEmployee(id: number, name: string) {
    this.isUpdating.set(true);
    await this.employeesService.updateEmployee(id, name);
    this.employees.reload();
    this.isUpdating.set(false);
  }
}
