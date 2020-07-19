import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {catchError, concatMap, map, mergeMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        console.log(token);

        const tokenReq = request.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });

        return next.handle(tokenReq);
      }),
      catchError(err => { return next.handle(request.clone())})
    );
  }
}
