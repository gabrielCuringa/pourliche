import { Component } from '@angular/core';
import { Calendar } from './components/calendar/calendar';

@Component({
  selector: 'restaurant-services',
  templateUrl: 'restaurant-services.html',
  imports: [Calendar],
})
export class RestaurantServices {}
