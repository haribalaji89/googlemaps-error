import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { countryInformation } from '@shared/constants/app.constants';
import { COUNTRY,environment } from 'environments/in/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RfqService extends BaseHttpService {
  private dataSource = new BehaviorSubject<any>('');
  data = this.dataSource.asObservable();
  constructor(private http: HttpClient) {
    super(http, 'secured/rfq/v1')
  }
  updatedDataSelection(data: any){
    this.dataSource.next(data);
  }
  submitQuotes(payload) {
    return this.post(payload, 'customer-quote');
  }

  getOEMQuotesForCurrentUser(payload) {
    let language = countryInformation[COUNTRY.COUNTRY_CODE].langCode;
    let url = '';
    if(payload.userEmail) 
      url = `${environment.SERVER_API_URL}/guest/rfq/v2/user-rfq`;
    else
      url = `${environment.SERVER_API_URL}/secured/rfq/v2/user-rfq`;
    payload.lang = language;
    return this.http.post<any>(url, payload);
    // return this.post(payload, 'user-rfq');
  }

  getQuotesForCurrentUser() {
    return this.get('user-rfq');
  }

  getPrefillTradeIn() {
    return this.get('prefil-trade-in');
  }

  getRfi(rfiData) {
    return this.post(rfiData,'rfi-quote');
  }

  getRfiGuest(rfiData) {
    return this.post(rfiData,'rfi-quote-guest');
  }

  getContactDealerRFI(rfiData){
    return this.post(rfiData,'contact-dealer-from-con');
  }

}
