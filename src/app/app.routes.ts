import { Routes } from '@angular/router';
import { RestaurantServices } from './features/restaurant-services/restaurant-services';
import { Team } from './features/team/team';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    canMatch: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'services',
        pathMatch: 'full',
      },
      {
        path: 'services',
        component: RestaurantServices,
      },
      {
        path: 'team',
        component: Team,
      },
    ],
  },
];
