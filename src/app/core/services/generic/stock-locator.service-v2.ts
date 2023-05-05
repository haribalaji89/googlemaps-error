import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class StockLocatorServiceV2 extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'general/stock-locator/v2');
  }

  public exactSimilarVehicles(data){
    return this.post(data, `fetch-exact-similar-vehicle`);
  }
}