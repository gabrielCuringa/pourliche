import { Component, effect, inject, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { Button, ButtonDirective } from 'primeng/button';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesFacade } from '../../../employees/facade/employees-facade';
import { ChipModule } from 'primeng/chip';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { minArrayLength } from '../../../../common/forms/form-validators';
import { RestaurantServiceDto } from '../../../../api/restaurant-services/restaurant-services.dto';
import { RestaurantServicesFacade } from '../../facade/restaurant-services.facade';
import { DateService } from '../../../../common/services/date-service';
import { ServicesSummaryFacade } from '../summary/services-summary.facade';
import { ShiftIconComponent } from '../shift-icon/shift-icon.component';

@Component({
  selector: 'service',
  templateUrl: 'service.html',
  imports: [
    DrawerModule,
    TranslatePipe,
    Button,
    DatePipe,
    AvatarModule,
    InputNumberModule,
    ReactiveFormsModule,
    ChipModule,
    ButtonDirective,
    InputGroup,
    InputGroupAddon,
    CurrencyPipe,
    ShiftIconComponent,
  ],
})
export class ServiceComponent {
  readonly restaurantService = input.required<RestaurantServiceDto>();

  readonly employeesFacade = inject(EmployeesFacade);
  readonly restaurantServicesFacade = inject(RestaurantServicesFacade);
  readonly servicesSummaryFacade = inject(ServicesSummaryFacade);
  readonly dateService = inject(DateService);

  private fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    tips: this.fb.control<number | undefined>(undefined, {
      validators: Validators.required,
    }),
    employeeIds: this.fb.nonNullable.control<number[]>([], {
      validators: minArrayLength(1),
    }),
  });

  isDrawerVisible = signal(false);

  constructor() {
    // init form with service value
    effect(() => {
      if (!this.isServiceExists()) return;

      this.form.reset({
        tips: this.restaurantService().tips,
        employeeIds: this.restaurantService().employee_ids,
      });
    });
  }

  async upsert() {
    if (this.form.invalid) {
      return;
    }
    try {
      await this.restaurantServicesFacade.upsert({
        date: this.restaurantService().service_date,
        employee_ids: this.form.controls.employeeIds.value,
        shift: this.restaurantService().shift,
        tips: this.form.controls.tips.value!,
      });
      this.servicesSummaryFacade.summary.reload();
      this.isDrawerVisible.set(false);
    } catch (error) {
      // display error message
    }
  }

  onEmployeeSelected(id: number) {
    const ids = this.form.controls.employeeIds.value;

    if (ids.includes(id)) {
      this.form.controls.employeeIds.setValue(ids.filter((_id) => _id !== id));
    } else {
      this.form.controls.employeeIds.setValue([...ids, id]);
    }
  }

  isServiceExists() {
    return this.restaurantService().service_id !== -1;
  }

  isEmployeeSelected(id: number) {
    return this.form.controls.employeeIds.getRawValue().includes(id);
  }

  async delete() {
    await this.restaurantServicesFacade.delete(this.restaurantService()?.service_id);
    this.servicesSummaryFacade.summary.reload();
    this.isDrawerVisible.set(false);
  }
}
