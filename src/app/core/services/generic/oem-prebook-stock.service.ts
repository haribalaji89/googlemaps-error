import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class OemPrebookStockService  extends BaseHttpService{

  constructor(private http: HttpClient) {
    super(http, 'general/stock/v2');
  }

  public fetchProximityDealers(data) {
    return this.post(data, `customer-fetchdealer`);
  }
}
