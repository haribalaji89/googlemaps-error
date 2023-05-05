import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseHttpService } from '../base-http.service';

/**
 * Name: SecuredService
 * params: HttpClient
 * basepath: bmw/secured/v1
 * desc: Secured services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class SecuredService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'secured');
   }

}
