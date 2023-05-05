import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class StockLocatorService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'general/stock-locator/v1');
  }

  public fetchFilterLookups(data) {
    return this.post(data, `filters`);
  }

  public fetchSortByLookups() {
    return this.get(`fetch-sort-by-options`);
  }

  public get360ViewDetails(data) {
    return this.post(data, `fetch-ext360view-by-config-id`);
  }

  public fetchPincode(data) {
    return this.post(data, `fetch-pincode`);
  }

  public fetchStock(data, params) {
    return this.post(data, `fetch-stock`, { params: params });
  }

  public stockCheck(data) {
    return this.post(data, `stock-check-by-config-id`);
  }

  public fetchSimilarVehicles(data) {
    return this.post(data, `fetch-similar-vehicles`);
  }
  public exactSimilarVehicles(data){
    return this.post(data, `fetch-exact-similar-vehicle`);
  }
}
