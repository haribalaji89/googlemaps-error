import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http.service';


/**
 * Name: SecuredService
 * params: HttpClient
 * basepath: guest/v1
 * desc: Guest services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class GuestService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'guest');
   }

}