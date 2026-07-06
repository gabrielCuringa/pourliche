import { Component, effect, inject, input, signal } from '@angular/core';
import { EmployeeDto } from '../../../api/employees/dtos/employees.dto';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesFacade } from '../facade/employees-facade';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'employee',
  imports: [Drawer, DrawerModule, ReactiveFormsModule, ButtonDirective, InputTextModule],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  readonly employeesFacade = inject(EmployeesFacade);
  readonly employee = input<EmployeeDto>();
  readonly isDetailVisible = signal(false);

  private fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const employee = this.employee();

      if (!employee) {
        this.form.reset({ name: '' });
        return;
      }

      this.form.reset({
        name: employee.name ?? '',
      });
    });
  }

  async delete() {
    const id = this.employee()?.id;
    if (!id) return;
    await this.employeesFacade.deleteEmployee(id);
  }

  async update() {
    const id = this.employee()?.id;
    const newName = this.form.getRawValue().name;
    if (!id) return;
    await this.employeesFacade.updateEmployee(id, newName);
    this.isDetailVisible.set(false);
  }
}
