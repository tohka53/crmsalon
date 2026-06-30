import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../models/models';
import { AuthService } from '../services/auth.service';

/** Restringe una ruta a un rol específico. */
export function roleGuard(role: Role): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.currentUser;
    if (!user) return router.createUrlTree(['/login']);
    if (user.role === role) return true;
    return router.createUrlTree([auth.homeRoute()]);
  };
}
