// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq = request;
    const token = 'cMvj6eVN5Tabm-152RIFXCwu3KRDGM-u';
    authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token )});

    // return next.handle(req);
    return next.handle(authReq).pipe(tap
            (
            (event: any) => {
              if (event instanceof HttpResponse) { }
            },
            (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.router.navigate(['home']);
                }
              }
            }
            ));

    }
}


