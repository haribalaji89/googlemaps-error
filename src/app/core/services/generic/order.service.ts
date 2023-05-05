import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'secured/order/v1');
  }

  getOrderIds() {
    return this.get(`fetch-order-list`);
  }

  getOrderById(id) {
    return this.get(`purchase-by-orderId/${id}`);
  }
  // CR-598D- MY purchase enhancement - start
  getTinyPodsPurchaseDetails() {
    return this.get(`purchase-details-tiny-pods`);
  }
  // CR-598D- MY purchase enhancement - end
}
