import { Injectable } from '@angular/core';
import { SecuredService } from './secured.service';
import { GeneralService } from './general.service';
import { COUNTRY, environment } from 'environments/in/environment.dev';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { analyticsInfo } from '@shared/constants/analytics.constants';
import { BaseHttpService } from '../base-http.service';


@Injectable({
  providedIn: 'root'
})
export class CatalogService extends BaseHttpService{

  constructor(
    private _securedService: SecuredService,
    private _generalService: GeneralService,
    private http : HttpClient
    ) {
      super(http, 'general/catalog/v1');
     }


  /**
   * @author Anjali Jajodia
   * API call for home page UCP catalog data
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
  public getUCPDetails(successCall, errorCall) {

    return this.get('ucp',{ params : { datalevel : 3} }).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }


  /**
   * API call for home page IN Body types catalog data
   * @author Anjali Jajodia
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
  public getBodyTypesData(successCall, errorCall) {
    return this.get('ucp/ucpByBodyType').subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

    /**
   * API call for home page TH Exclusive Models catalog data
   * @author Anjali Jajodia
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
  public getExclusiveModelsData(successCall, errorCall) {
    return this.get('online-exclusive-model').subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * API call for home page JP Limited Edition catalog data
   * @author Anjali Jajodia
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
  public getLimitedEditionData(successCall, errorCall) {
    return this.get('online-limited-edition').subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000"
        && Object.keys(res.data).length > 0
        ) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

    /**
   * API call for home page JP Special Edition catalog data
   * @author Anjali Jajodia
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
  public getSpecialEditionData(successCall, errorCall) {
    return this.get('online-store-model').subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public getPreBookingDetails() {
    return this.get('pre-reservation');
  }

  public getPreBookingVariantLevelDetails(categoryId?, modelCategoryId?) {
    const url = 'pre-reservation/' + categoryId + '/' + modelCategoryId;
    return this.get(url);
  }

  public getUCPModelDetails(data,successCall, errorCall) {

    return this.get(`ucp/${data.categoryId}/${data.modelCategoryId}`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data || {}).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }


  public getUCPModelAllSeriesDetails(successCall, errorCall) {
    return this.get(`ucp/`,{ params : { datalevel : 'all'} }).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public getUCPModelModelImageDetails(requestData,successCall, errorCall) {
    return this.post(requestData,`ucp/model-image`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public getUCPModelFetchInteriorsDetails(requestData,successCall, errorCall) {
    return this.post(requestData,`ucp/fetch-interior`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public getExclusiveModelDetails(data, successCall, errorCall) {

    return this.get(`online-exclusive-model/${data.categoryId}/${data.modelCategoryId}`).subscribe(
        (res: any) => {
          if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length >=0) {
            successCall(res);
          } else
            errorCall(res);
      },
      err => {
        errorCall(err);
      });
  }

   /**
   * API call for home page IN recommended-model catalog data
   * @author Keshav Katekar
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
  public getUCPRecommendedModels(requestData,successCall, errorCall) {
    return this.post(requestData,`ucp/recommended-model`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res.data);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * API call for home page TH online-exclusive-model recommended-model catalog data
   * @author Keshav Katekar
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
  public getRecModelDetailsForTH(requestData,successCall, errorCall) {
    return this.get(`online-exclusive-model/recommended-model/${requestData}`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }
  public getOnlineLimitedEditionDetails(data, successCall, errorCall) {

    return this.get(`online-exclusive-model/${data.categoryId}/${data.modelCategoryId}`).subscribe(
        (res: any) => {
          if (res && res.result && res.result.code && res.result.code === "2000"
           && Object.keys(res.data).length > 0
           ) {
            successCall(res);
          } else
            errorCall(res);
      },
      err => {
        errorCall(err);
      });
  }

  public getOnlineSpecialEditionDetails(data, successCall, errorCall) {

    return this.get(`online-store-model/${data.categoryId}/${data.modelCategoryId}`).subscribe(
        (res: any) => {
          if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
            successCall(res);
          } else
            errorCall(res);
      },
      err => {
        errorCall(err);
      });
  }

  public getBodyTypesDetails(data, successCall, errorCall) {
    return this.get(`ucp/ucpByBodyType/${data.categoryId}/${data.modelCategoryId}`).subscribe(
        (res: any) => {
          if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
            successCall(res);
          } else
            errorCall(res);
      },
      err => {
        errorCall(err);
      });
  }

   getModelsByRangeCode(rangeCode, successCall, errorCall){
    return this.get(`ucp/${rangeCode}`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  public getLimitedEditionStock(data, successCall, errorCall) {

    return this.post(data , `online-exclusive-model/stock-check`).subscribe(
      (res: any) => {
        successCall(res);
      },
      err => {
        errorCall(err);
      });
  }

  public getFinanceDetails(data, successCall, errorCall) {
    // return this.http.get('./assets/json/fetch-finance-details.json').subscribe(
    return this.post(data,`fetch-installments`).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }

  fetchInstallments(payload){
    return this.post(payload,'fetch-installments?lang=en')
  }

  public saveEngageCalcDeatils(data:any, successCall, errorCall) {
    return this.post(data,`save-engage-data`).subscribe(
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

  public saveSFCalcDeatils(data:any, successCall, errorCall) {
    return this.post(data,`save-sf-data`).subscribe(
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

  // CR-499-changes in product details page - Start
  public getInstallmentFromEngage(data:any, successCall, errorCall) {
    return this.post(data,'get-installments').subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
          successCall(res);
        } else
          errorCall(res);
    },
    err => {
      errorCall(err);
    });
  }
  // CR-499-changes in product details page - End
}



@Injectable({
  providedIn: 'root'
})
export class CatalogServicev2 extends BaseHttpService{

  constructor(
    private _securedService: SecuredService,
    private _generalService: GeneralService,
    private http : HttpClient
    ) {
      super(http, 'general/catalog/v2');
     }

     /**
   * API call for home page JP Special Edition catalog data
   * @author Anjali Jajodia
   * @param {*} successCall
   * @param {*} errorCall
   * @memberof CatalogService
   */
      public getSpecialEditionData(successCall, errorCall) {
        return this.get('online-store-model').subscribe(
          (res: any) => {
            if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
              successCall(res);
            } else
              errorCall(res);
        },
        err => {
          errorCall(err);
        });
      }
    
      public getPreBookingDetails() {
        return this.get('pre-reservation');
      }
       /**
     * API call for home page TH Exclusive Models catalog data
     * @author Anjali Jajodia
     * @param {*} successCall
     * @param {*} errorCall
     * @memberof CatalogService
     */
    public getExclusiveModelsData(successCall, errorCall) {
      return this.get('online-exclusive-model').subscribe(
        (res: any) => {
          if (res && res.result && res.result.code && res.result.code === "2000" && Object.keys(res.data).length > 0) {
            successCall(res);
          } else
            errorCall(res);
      },
      err => {
        errorCall(err);
      });
    }
}
