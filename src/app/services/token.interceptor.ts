import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const EXCLUDED_PATH = ['/login', '/register','/verifEmail'];
    // If the request URL does not contain "/login", add the Authorization header
    if (!EXCLUDED_PATH.some(path => request.url.includes(path))) {
      let jwt = this.authService.getToken();
      let reqWithToken = request.clone({
        setHeaders: { Authorization: "Bearer " + jwt }
      });
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }
}