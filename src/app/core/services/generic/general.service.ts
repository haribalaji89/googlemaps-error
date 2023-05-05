import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Reload } from '@shared/schemas/quote-reload';
import { COUNTRY, environment } from 'environments/in/environment.dev';
import { BehaviorSubject, Observable } from 'rxjs';

import { BaseHttpService } from '../base-http.service';
import { countryInformation } from '@shared/constants/app.constants';
import { map } from 'rxjs/operators';
import { bodyTypes } from '@shared/constants/bodyTypes';
import { vssBodyTypes } from '@shared/constants/vssBodyTypes.constants';




/**
 * Name: GeneralService
 * params: HttpClient
 * basepath: bmw/general/v1
 * desc: General services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends BaseHttpService {
  public reload: BehaviorSubject<Reload> = new BehaviorSubject(null);
  public reloadConfig: BehaviorSubject<Reload> = new BehaviorSubject(null);
  public userDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  private messageEvent = new BehaviorSubject(null);
  public sendGuestDetailsToGuestForm: BehaviorSubject<any> = new BehaviorSubject(null);
  /* CR-591-SMOSS-58307-Engage Quoation Expiry - Start */
  public checkEngageQuotationExpiry: BehaviorSubject<any> = new BehaviorSubject(null);
  /* CR-591-SMOSS-58307-Engage Quoation Expiry - End */
  currentMessage = this.messageEvent.asObservable();
  constructor(private http: HttpClient) {
    super(http, 'general');
   }


   @Output() fetchOffersData = new EventEmitter();

  setReload(data: any) {
    this.reload.next(data);
  }

  getReload() {
    return this.reload.asObservable();
  }

  setConfigurationsLoad(data: any) {
    this.reloadConfig.next(data);
  }

  getConfigurationsLoad() {
    return this.reloadConfig.asObservable();
  }

  public setUserDetails(data: any) {
    this.userDetails.next(data);
  }

getContent(): Observable<any> {
  return this.http.post<any>(environment.SERVER_API_URL + '/general/pagecontent/' + COUNTRY.COUNTRY_CODE + '/v1/page-content', {
       'targetEnv': environment.HEADER_ENVIRONMENT
   });
}

emitData(val) {
  this.fetchOffersData.emit(val);
}

  @Output() hidebox = new EventEmitter();
  emitBoxData() {
    this.hidebox.emit();
  }

  public getJSON(url: any): Observable<any> {
    return this.http.get(url);
  }

  public isUnderMaintenance(): Observable<any> {
    let language = countryInformation[COUNTRY.COUNTRY_CODE].langCode;
    let url = `${environment.SERVER_API_URL}/general/pagecontent/${language}/site-status/${environment.HEADER_ENVIRONMENT}`;
    return this.http.get(url);
  }

  public reserveStatusConfig(): Observable<any>{
    let url = `${environment.SERVER_API_URL}/general/v1/custom-catalog/reserve-status-config`;
    return this.http.get(url);
  }

  public ucpreserveStatusConfig(): Observable<any>{
    let url = `${environment.SERVER_API_URL}/general/v1/ucp-reserve-status-config`;
    return this.http.get(url);
  }


  public keepMe(data: object,registered): Observable<any> {
    if(registered=='yes'){
var path='secured';
    }
    else{
      var path='secured';
    }
    let language = countryInformation[COUNTRY.COUNTRY_CODE].langCode;
    return this.http.post<any>(`${environment.SERVER_API_URL}/${path}/customer-journey/${COUNTRY.COUNTRY_CODE}/v1/oem-kmi?lang=en`,data);
  }
  public keepMeCheckDetails(data: object,registered): Observable<any> {
    if(registered=='yes'){
      var path='secured';
          }
          else{
            var path='secured';
          }
    let language = countryInformation[COUNTRY.COUNTRY_CODE].langCode;
    return this.http.post<any>(`${environment.SERVER_API_URL}/${path}/customer-journey/${COUNTRY.COUNTRY_CODE}/v1/oem-kmi-check?lang=en`,data);
  }
  public releaseStatus(data: object): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/custom-catalog/reserve-status?lang=en`,data);
  }
  public ucpreleaseStatus(data: object): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/ucp-reserve-status?lang=en`,data);
  }
  public ucpstockcheck(data: object): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/ucp-stock-check?lang=en`,data);
  }
  public ucpreleaseStock(data: object): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/ucp-stock-check?lang=en`,data);
  }

  public ucpstockcheckAndcompare(data: object): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/ucp-available-stock-check?lang=en`,data);
  }
  public ucpcrmId(data: object): Observable<any>{
    let url = `${environment.SERVER_API_URL}/general/payment/${COUNTRY.COUNTRY_CODE}/get-order-id/${data}`;
    return this.http.get(url);
  }

/** START: CR-607 - JP & AU vss stock check, reserve, release & update */ 
  public vssStockCheckAndReserve(data: object): Observable<any>{
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/vss-stock-check-and-reserve`,data);
  }
  public vssStockCheckAndcompare(data: object): Observable<any>{
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/vss-stock-availability-check`,data);
  }
  public vssStockReserveUpdate(data: object): Observable<any>{
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/vss-stock-update`,data);
  }

  public vssStockRelease(data: object): Observable<any>{
    return this.http.post<any>(`${environment.SERVER_API_URL}/general/v1/vss-stock-release`,data);
  }
/** END: CR-607 - JP & AU vss stock check, reserve, release & update */

  /**CR-598B body tye icons - start */
  public addBodyTypeImageName(filterLookups) {
    if (filterLookups['primary']['bodyType'] && filterLookups['primary']['bodyType'].length > 0) {
      let bodyType = filterLookups?.primary?.bodyType;
      bodyType.forEach( (element: any) => {
        const filteredBodyTypeIcon = bodyTypes.filter(bodyType => {
          return bodyType.code === element.code;
        });
        element['imageName'] = filteredBodyTypeIcon.length > 0 ? filteredBodyTypeIcon[0].imageName : 'assets/images/car-type/sedan.svg';
      });
      return bodyType;
    }
  }
  /**CR-598B body tye icons - end */

    /**CR-598B body tye icons vss- start */
    public addVssBodyTypeImageName(filterLookups) {
      if (filterLookups['primary']['bodyType'] && filterLookups['primary']['bodyType'].length > 0) {
        let bodyType = filterLookups?.primary?.bodyType;
        bodyType.forEach( (element: any) => {
          const filteredBodyTypeIcon = vssBodyTypes.filter(bodyType => {
            return bodyType.code === element.code;
          });
          element['imageName'] = filteredBodyTypeIcon.length > 0 ? filteredBodyTypeIcon[0].imageName : 'assets/images/car-type/sedan.svg';
        });
        return bodyType;
      }
    }
    /**CR-598B body tye icons vss - end */

    /**CR-639 check user rfi leads- start */
    public getRFIRaisedDetails(payload){
      return this.post(payload,`rfq/v1/check-user-rfi-leads`)
    }
    /**CR-639 check user rfi leads- end */
}


