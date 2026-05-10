import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

let isRefeshing = signal(false);
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('authToken');

  //If this IS the refresh request, just forward it — no error handling
  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const authReq = addToken(req, token!);
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status !== 401) return throwError(() => error);

      if (isRefeshing()) return throwError(() => error);

      isRefeshing.set(true);
      // Call refresh token API and update the token in localStorage
      // After refreshing the token, retry the original request with the new token
      // Finally, set isRefeshing back to false
      return authService.refreshToken().pipe(
        switchMap((newToken) => {
          localStorage.setItem('authToken', newToken.accessToken);
          const retryReq = addToken(req, newToken.accessToken);
          isRefeshing.set(false);
          return next(retryReq);
        }),
        catchError((refreshError) => {
          isRefeshing.set(false);
          return throwError(() => refreshError);
        })
      );
    })
  );

};


const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
