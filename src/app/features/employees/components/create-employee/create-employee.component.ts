import { Component, inject, input, signal } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { EmployeesFacade } from '../../facade/employees-facade';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'create-employee',
  imports: [Button, DrawerModule, InputTextModule, ButtonDirective, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
})
export class CreateEmployeeComponent {
  private fb = inject(FormBuilder);
  employeesFacade = inject(EmployeesFacade);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  isVisible = signal(false);

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      const name = this.form.getRawValue().name;
      await this.employeesFacade.createEmployee(name);
    } catch (error) {
    } finally {
      this.form.reset();
      this.isVisible.set(false);
    }
  }
}
