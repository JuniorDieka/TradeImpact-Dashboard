import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.notificationService.error('Session expired. Please login again.');
        } else if (error.status === 403) {
          this.notificationService.error('You do not have permission to access this resource.');
        } else if (error.status === 404) {
          this.notificationService.error('Resource not found.');
        } else if (error.status === 500) {
          this.notificationService.error('Server error. Please try again later.');
        } else if (error.error?.message) {
          this.notificationService.error(error.error.message);
        } else {
          this.notificationService.error('An error occurred. Please try again.');
        }

        return throwError(() => error);
      })
    );
  }
}
