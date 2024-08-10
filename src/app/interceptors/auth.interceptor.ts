import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);

  const token = localStorageService.get('token');

  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newRequest);
};
