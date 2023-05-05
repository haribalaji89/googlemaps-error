import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseHttpService } from '../base-http.service';

/**
 * Name: AuthenticateService
 * params: HttpClient
 * basepath: /authenticate
 * desc: Authentication related services should be accessing this service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'authenticate');
   }

}
