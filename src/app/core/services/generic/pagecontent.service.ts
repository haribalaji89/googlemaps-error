import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { COUNTRY } from '@environments/in/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PageContentService  extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'general');
  }

  public getOfferData(successCall, errorCall) {
    return this.get(`pagecontent/`+ COUNTRY.COUNTRY_CODE + `/v1/smoss-pagecontent`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }


  public getSeriesData(successCall, errorCall) {
    return this.get(`pagecontent/v1/series-fuel-body-type`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public getBodyFuelData(currentSeries, successCall, errorCall) {
    return this.get(`pagecontent/v1/series-fuel-body-type?seriesCode=${currentSeries}`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }


/** CR-136 -Get SG pages content service **/
public getSgPageData(successCall, errorCall) {
   // return this.get(`v1/en/cmspages`).subscribe(
    return this.get(`pagecontent/v1/en/cmspages`).subscribe(
      (res: any) => {
        if (res) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

/** CR-136 -Get SG FAQ page service **/
public getSgFaqData(successCall, errorCall) {
  return this.get(`pagecontent/v1/en/faq-category`).subscribe(
    (res: any) => {
      if (res) {
        successCall(res);
      } else
        errorCall(res);
  },
  err => {
    errorCall(err);
  });
}

  public fetchProductSpecification(successCall, errorCall) {
    return this.get(`pagecontent/v1/product-spec`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public miniProductCategory(successCall, errorCall) {
    return this.get(`pagecontent/v1/product-type`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public fetchAuCarousalData(requestData) {
    return this.post(requestData,`pagecontent/v1/fetch-offers`)
  }

  public fetchCarousalData(requestData, successCall, errorCall) {
    return this.post(requestData,`pagecontent/v1/fetch-offers`).subscribe(
      (res: any) => {
        if (res) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  getMinimumAmount(data, successCall, errorCall){
    return this.get(`pagecontent/v1/${data.langCode}/get-minimum-booking/${data.seriesName}/${data.modelRangeCode}?environment=${data.env}`).subscribe(
   (res:any) => {
           if(res && res.result && res.result.code && res.result.code === "2000"){
              successCall(res);
           } else{
             errorCall(res)
           }
   }, err =>{
      errorCall(err)
   });
  }

}



