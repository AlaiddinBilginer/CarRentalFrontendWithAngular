import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toastrService: ToastrService = inject(ToastrService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['login']);
    toastrService.info('Giriş yapmalısınız');
    return false;
  }
};
