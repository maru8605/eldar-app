import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string = 'simulated.jwt.token';
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    

    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return next.handle(clonedRequest);
  }
}
