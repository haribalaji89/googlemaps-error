import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../base-http.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DreamCarsServiceV2 extends BaseHttpService {
  private setLocationEvent = new Subject<any>();
  constructor(private http: HttpClient) {
    super(http, 'general/dream-cars/v2');
  }

  public fetchBmwDreamCars() {
    return this.get(`bmwDreamCar`);
  }

  public fetchAllModels(data) {
    return this.post(data,`bmwDreamCar`);
  }


  public getInstallmentRangeSteps(countryCode){
    if(countryCode == 'au_bmw'){
       return 10;
    }else if(countryCode == 'MY' || countryCode == 'IN'){
      return 1000;
    }else if(countryCode == 'TH'){
      return 2000;
    }else{
      return 1000;
    }
  }

  public getPriceRangeSteps(countryCode){
   return 10000;
   
  }
  
  sendClickEvent() {
    this.setLocationEvent.next({});
  }
  receiveClickEvent(): Observable<any> {
    return this.setLocationEvent.asObservable();
  }
}

