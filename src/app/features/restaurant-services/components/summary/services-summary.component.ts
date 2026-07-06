import { Component, inject, input } from '@angular/core';
import { ServicesSummaryFacade } from './services-summary.facade';
import { Skeleton } from 'primeng/skeleton';
import { SummaryItemComponent } from './summary-item/summary-item.component';

@Component({
  selector: 'services-summary',
  templateUrl: './services-summary.component.html',
  imports: [Skeleton, SummaryItemComponent],
})
export class ServicesSummaryComponent {
  readonly facade = inject(ServicesSummaryFacade);
}
