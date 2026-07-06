import { Component, input } from '@angular/core';
import { EmployeeMonthlyTips } from '../../../../../api/employees/dtos/employees.dto';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'summary-item',
  templateUrl: './summary-item.component.html',
  imports: [CurrencyPipe, TranslatePipe],
})
export class SummaryItemComponent {
  readonly summary = input.required<EmployeeMonthlyTips>();
}
