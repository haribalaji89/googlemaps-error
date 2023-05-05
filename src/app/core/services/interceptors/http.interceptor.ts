
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,Subject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { COUNTRY, environment } from 'environments/in/environment.dev';
// CR-586 Refresh Session Execution on invalid Token
import { LoginService } from '@core/services/generic/login.service';
import { EmitterService } from '@core/services/emitter.service';
@Injectable()
export class InterceptorService implements HttpInterceptor {
    public countryCode = COUNTRY.COUNTRY_CODE;
    public headerEnvironment = environment.HEADER_ENVIRONMENT;
    refreshToken:any;
    apiToken:any;
    constructor(
        private router: Router,
        // CR-586 Refresh Session Execution on invalid Token
        private loginService: LoginService,
        private _emitterService:EmitterService
        ) { }
    
    // CR-586 Refresh Session Execution on invalid Token
    private _refreshSubject: Subject<any> = new Subject<any>();

    private _ifTokenExpired() {
      this._refreshSubject.subscribe({
        complete: () => {
          this._refreshSubject = new Subject<any>();
        }
      });
      if (this._refreshSubject.observers.length === 1) {
        this.apiToken = localStorage.getItem('api-token');
        this.refreshToken = localStorage.getItem('refreshToken');
        this.loginService.refreshToken().subscribe(
          this._refreshSubject
          );
      }
      return this._refreshSubject;
    }
    // CR-586 Refresh Session Execution on invalid Token
    private _checkTokenExpiryErr(error: HttpErrorResponse): boolean {
      return (
        error.status &&
        error.status === 403 || 
        error.status === 440 ||
        error.error.message === "Invalid or Expired Token"
      );
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = '';
        if (this.router.url.indexOf('dealer/') > -1) {
            token = localStorage.getItem('dealer-api-token');
        } else {
          // CR-586 Refresh Session Execution on invalid Token
            token = localStorage.getItem('api-token')
            this.refreshToken = localStorage.getItem('refreshToken')
            /* Condition for setting token to null while making call for Admin Portal */
            if (request.url.indexOf('page-content') > -1){
            token = null;
            }
        }
        if (token && request.url.indexOf('secured/') > -1) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if(token && request.url.indexOf('general/login-v2/refresh-token-v2') > -1){
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.refreshToken) });
        }
        if (!request.headers.has('Content-Type')) {
          
            request = request.clone({ headers: request.headers.set('x-region-id', this.countryCode) });
            request = request.clone({ headers: request.headers.set('x-env-id', this.headerEnvironment) });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        /**
         * Disable web content catching.
            request = request.clone({headers: request.headers.set('Cache-Control', 'no-cache, no-store')});
            request = request.clone({headers: request.headers.set('Pragma', 'no-cache')});
            request = request.clone({headers: request.headers.set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')});
        */

       /**
        * Guest Checkout generic url manipulation
        * @author Abhishek
        */
        let genericReq: HttpRequest<any>;
        if (request.url.indexOf('secured/') > -1 && localStorage.getItem('sessid') && this.router.url.indexOf('dealer/') === -1) {
 
          const guestDetail = JSON.parse(localStorage.getItem('guest-user-details'));
          const guestMappedSessionId = guestDetail && guestDetail.sessionId || '';
          const sessionId = (this.countryCode == 'th' && guestDetail && this.router.url.indexOf('pre-book/') > -1) ? guestMappedSessionId : localStorage.getItem('sessid');
          const encryptedSessionId = btoa(sessionId);
          if (request.method.indexOf('GET') > -1 ) {
            request = request.clone({ params: request.params.set('sessionId', encryptedSessionId)});
          } else if (request.method.indexOf('POST') > -1 ) {
            request = request.clone({ body: {...request.body, sessionId}});
          } else {
            request = request.clone({ body: {...request.body, sessionId}});
          }

          const guestUrl = request.url.replace('/secured/', '/guest/');
          genericReq = request.clone({
            url: `${guestUrl}`
          });
        } else {
          genericReq = request.clone();
        }

    return next.handle(genericReq).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // Incase any logic needs to be implemented. As of now no logics needed.
                
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
          // CR-586 Refresh Session Execution on invalid Token
          
          if( (this.countryCode ==='sg' || this.countryCode ==='in_mini') || localStorage.getItem('dealer-api-token') || this.router.url.includes('dealer/login'))
          {
            //this.errorHandlerService.handleError(error);
            return throwError(error);
          }
          else{
            if (this._checkTokenExpiryErr(error)) { 
              return this._ifTokenExpired().pipe(
                switchMap((data:any) => {
                  this.apiToken = localStorage.setItem('api-token', data['access_token']);
                  this.refreshToken = localStorage.setItem('refreshToken',data['refresh_token']);
                  return next.handle(this.updateHeader(genericReq));
                })
              );                  
          }
          else{
            //this.errorHandlerService.handleError(error);
            return throwError(error);
          }
          }            
        }));
    }
    // CR-586 Refresh Session Execution on invalid Token
    updateHeader(req) {     
      const authToken = localStorage.getItem('api-token');    
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${authToken}`)
      });
      return req;
    }
   
}
