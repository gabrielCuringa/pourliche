import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { EmployeesFacade } from '../employees/facade/employees-facade';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { EmployeeComponent } from '../employees/components/employee.component';
import { CreateEmployeeComponent } from '../employees/components/create-employee/create-employee.component';

@Component({
  selector: 'team',
  imports: [TranslatePipe, SkeletonModule, EmployeeComponent, ToastModule, CreateEmployeeComponent],
  templateUrl: 'team.html',
})
export class Team {
  employeesFacade = inject(EmployeesFacade);
  isCreateEmployeeVisible = signal(false);
}
