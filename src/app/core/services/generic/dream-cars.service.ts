import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DreamCarsService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'general/dream-cars/v1');
  }

  public fetchBmwDreamCars() {
    return this.get(`bmwDreamCar`);
  }

  public fetchHomeTabs() {
    return this.get(`tab-list-sequence`);
  }
}
