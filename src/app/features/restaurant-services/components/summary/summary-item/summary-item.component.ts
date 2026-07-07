import { Component, input } from '@angular/core';
import {
  EmployeeServiceSummaryGroupedDto,
  EmployeeServiceSummaryItemDto,
} from '../../../../../api/employees/dtos/employees.dto';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ShiftIconComponent } from '../../shift-icon/shift-icon.component';

@Component({
  selector: 'summary-item',
  templateUrl: './summary-item.component.html',
  imports: [CurrencyPipe, TranslatePipe, ShiftIconComponent],
})
export class SummaryItemComponent {
  readonly summary = input.required<EmployeeServiceSummaryGroupedDto>();
}
