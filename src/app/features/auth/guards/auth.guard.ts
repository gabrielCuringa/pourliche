import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '../facade/auth.facade';

export const AuthGuard: CanActivateFn = async (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  console.log('AuthGuard');
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  await authFacade.initialize();

  if (!authFacade.isAuthenticated()) {
    console.log('unlogged');
    return router.createUrlTree(['/login'], {
      queryParams: {
        redirect: state.url,
      },
    });
  }
  return true;
};
