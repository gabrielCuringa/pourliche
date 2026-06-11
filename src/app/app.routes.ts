import { Routes } from '@angular/router';
import { RestaurantServices } from './restaurant-services/restaurant-services';
import { Team } from './team/components/team';

export const routes: Routes = [
  {
    path: '',
    component: RestaurantServices,
  },
  {
    path: 'team',
    component: Team,
  },
];
