import { Component, input } from '@angular/core';
import { Shift } from '../../../../api/restaurant-services/restaurant-services.dto';

@Component({
  selector: 'shift-icon',
  templateUrl: './shift-icon.component.html',
})
export class ShiftIconComponent {
  readonly shift = input.required<Shift>();
  readonly squared = input<boolean>(false);
}
