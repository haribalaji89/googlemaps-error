import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseHttpService } from '../base-http.service';

/**
 * Name: PaymentService
 * params: HttpClient
 * basepath: bmw/payment/techprocess/checkoutjs/online
 * desc: Payment services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'payment/techprocess/checkoutjs/online');
   }

}




