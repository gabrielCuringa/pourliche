import { Component, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';

export enum Shift {
  lunch = 'lunch',
  dinner = 'dinner',
}

@Component({
  selector: 'service',
  templateUrl: 'service.html',
  imports: [DrawerModule, TranslatePipe, Button, DatePipe, AvatarModule, InputNumberModule],
})
export class ServiceComponent {
  protected readonly Shift = Shift;
  readonly shift = input.required<Shift>();
  readonly date = input<Date>();
  isDrawerVisible = signal(false);
  tips = input<number>();
}
