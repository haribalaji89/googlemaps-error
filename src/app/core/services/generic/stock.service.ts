import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'general/stock/v1');
  }

  public fetchProximityDealers(data) {
    return this.post(data, `get-proximity-dealers`);
  }
}
