import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // This is just an example of how to use the interceptor. 
    // In a real application, you would want to implement a more robust solution for handling authentication and token refresh logic.
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )
  ]
};
