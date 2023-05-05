import { Injectable } from '@angular/core';
import { SecuredService } from './secured.service';
import { GeneralService } from './general.service';
import { COUNTRY } from 'environments/in/environment.dev';
import { GuestService } from './guest.service';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * Name: DealerService
 * desc: Dealer related services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  private testDriveSelected : BehaviorSubject<Boolean>=new BehaviorSubject(false);
  constructor(
    private _securedService: SecuredService,
    private _generalService: GeneralService,
    private _guestService: GuestService
    ) { }

  public countryCode = COUNTRY.COUNTRY_CODE;
  serviceUrl = 'dealer/v1/';

  /**
   * getDealerUserDetails
   * to get the details of user who is currently logged in
   */
  public getDealerUserDetails(successCall, errorCall) {
    const url = this.serviceUrl + 'dealer-user-details';
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
        errorCall(res);
      }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * getPendingMessages
   * to get pending messages from dealer
   */
  public getPendingMessages(data, successCall, errorCall) {
    const url = this.serviceUrl + 'pending-message';
    this._securedService.post(data, url).subscribe((res) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
           successCall(res);
        } else {
          errorCall(res);
        }
    }, error => {
      errorCall(error);
    });
  }

  /**
   * loadChatHistory
   * to load chat histroy from dealer
   */
  public loadChatHistory(data, successCall, errorCall) {
    const url = this.serviceUrl + 'history';
    this._securedService.post(data, url).subscribe((res) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
           successCall(res);
        } else {
          errorCall(res);
        }
    }, error => {
      errorCall(error);
    });
  }

  /**
   * fetchStatusByKey
   * to check live chat status
   */
  public fetchStatusByKey(data, successCall, errorCall) {
    const url = this.serviceUrl + 'status';
    this._securedService.post(data, url).subscribe(
    (res: any) => {
      if (typeof res !== undefined) {
        successCall(res);
      } else {
        errorCall(res);
      }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * getCustomerPendingMessages
   * to get all the messages from dealer
   */
  public getCustomerPendingMessages(userId, successCall, errorCall){
    const url = this.serviceUrl + 'customer-pending-message';
    this._securedService.post(userId, url).subscribe((res)=>{
        if(res && res.result && res.result.code && res.result.code === '2000'){
           successCall(res)
        }
    }, error =>{
      errorCall(error)
    });
  }

/**
 * getCustomerPendingMessageall
 * get pending all past messages from dealer
 */
  getCustomerPendingMessagesAll(data, successCall, errorCall){
    const url = this.serviceUrl + 'customer-pending-message-all';
    this._securedService.post(data, url).subscribe((res)=>{
        if(res && res.result && res.result.code && res.result.code === '2000'){
           successCall(res)
        }
    }, error =>{
      errorCall(error)
    });
  }

  /**
   * getDealerPendingMessagesAll
   * get all pending messages from dealer
   */
  public getDealerPendingMessagesAll(data, successCall, errorCall) {
    const url = this.serviceUrl + 'pending-message-all';
    this._securedService.post(data, url).subscribe((res) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        }
    }, err =>{
      errorCall(err);
    });
  }

  /**
   * getDealerPendingMessagesAllJapan
   * get all pending messages from dealer in Japan
   */
  public getDealerPendingMessagesAllJapan(data, successCall, errorCall) {
    const url = this.serviceUrl + 'pending-message-all-japan';
    this._securedService.post(data, url).subscribe((res) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    }, err =>{
      errorCall(err);
    });
  }

  /**
   * getConsultantChatDetailsWithUser
   * get Consultant chat details with user
   */
  public getConsultantChatDetailsWithUser(dealerCode, crmId, successCall, errorCall) {
    const url = this.serviceUrl + 'consultant-chat-details-with-user/' + dealerCode + '/' + crmId;
    this._securedService.get(url).subscribe(
    (res: any) => {
      if (res && res.result && res.result.code && res.result.code === '2000') {
        successCall(res);
      } else {
        errorCall(res);
      }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * fetchDealerSalesConsultants
   * get list of sales consultants working under current logged dealer
   */
  public fetchDealerSalesConsultants(successCall, errorCall) {
    const url = this.serviceUrl + 'dealer-sales-consultants';
    this._securedService.get(url).subscribe(
    (res: any) => {
      if (res && res.result && res.result.code && res.result.code === '2000') {
        successCall(res);
      } else {
        errorCall(res);
      }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * hadConversationBetween
   * get list of cartIds for user chat requests
   */
  public hadConversationBetween(dealerId, successCall, errorCall) {
    const url = this.serviceUrl + 'had-conversation-between/' + dealerId;
    this._securedService.get(url).subscribe(
    (res: any) => {
      if (res && res.result && res.result.code && res.result.code === '2000') {
        successCall(res);
      } else {
        errorCall(res);
      }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * fetchQuoteforNotification
   * to get the brief details of quotes
   */
  public fetchQuoteforNotification(successCall, errorCall) {
    const url = this.serviceUrl + 'quote';
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * fetchEnquiresList
   * to fetch List of user enquires for current logged dealer
   */
  public fetchEnquiresList(successCall, errorCall) {
    const url = this.serviceUrl + 'enquiry-quote';
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * fetchSalesList
   * to fetch List of sales and buy-now requests for current logged dealer
   */
  public fetchSalesList(successCall, errorCall) {
    const url = this.serviceUrl + 'buy-now';
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }


   /*** Author Aarti ***/
   /***  fetchCalendlyData ***/
   /***  to fetch List of calendly  ***/
  public getCalendlyData(dealerCode, successCall, errorCall) {
   // const url = this.serviceUrl + 'get-dealer-videoChat/'+ dealerId;
    const url = this.serviceUrl + 'get-dealer-videoChat?dealerCode=' + dealerCode ;
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

     /*** Author Aarti ***/
   /***  saveCalendlyData ***/
   /***  to save data of calendly  ***/
  public saveCalendlyData(reqBody, successCall, errorCall){
    const url = this.serviceUrl + 'save-dealer-videoChat';
    this._securedService.post(reqBody, url).subscribe(res =>{
      if(res && res.code && res.code === '2000') {
       successCall(res);
      }else{
        errorCall(res);
      }
    }, err =>{
      errorCall(err)
    })
  }

  /**end **/

  /**
   * fetchTestDriveRequestList
   * to fetch List of test-drive requests for current logged dealer
   */
  public fetchTestDriveRequestList(successCall, errorCall) {
    const url = this.serviceUrl + 'test-drive';
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * docUpload
   * to upload doc for the customer as per customer request
   */
  public docUpload(data, successCall, errorCall) {
    const url = this.serviceUrl + 'userdocument';
    this._securedService.post(data, url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * fetchModelConfigById
   */
  public fetchModelConfigById(cartId, successCall, errorCall) {
    const url = this.serviceUrl + 'fetch-model-config-by-id/' + cartId;
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === 2000) {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * getDealerCustomerChatNotification
   */
  public getDealerCustomerChatNotification(body, successCall, errorCall) {
    const url = this.serviceUrl + 'dealer-customer-chat-notification';
    this._generalService.post(body, url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === '2000') {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  /**
   * get Sales Person data
   */
  public getSalesPerson(reqBody, successCall, errorCall){
    const url = this.serviceUrl + 'sales-person';
    this._securedService.post(reqBody, url).subscribe(res =>{
      if(res && res.result && res.result.code && res.result.code === '2000') {
       successCall(res);
      }else{
        errorCall(res);
      }
    }, error =>{
      errorCall(error)
    })

  }


  /**
   * GetConfirmBooking api call
   */
  public getConfirmBooking(sale, successCall, errorCall?) {
    const url = this.serviceUrl + 'customer-confirm-booking/' + + sale.purchaseId + '/buynow/' + sale.cartId;
    //this._securedService.get('dealer/v1/customer-confirm-booking/' + sale.purchaseId + '/buynow/' + sale.cartId)
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  public getFavDealerDetails(favDealerCode, successCall, errorCall?) {
    const url = this.serviceUrl + 'dealer-by-dealer-code/' + favDealerCode;
    this._securedService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }


  public getDealerDetailsById(favDealerCode, successCall, errorCall?) {
    const url =  `${this.serviceUrl}dealers?dealerCode=${favDealerCode}`;
    this._generalService.get(url).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }

  getDealerUserMap(cartId) {
    const url = this.serviceUrl + 'user-dealer-map/'+ (cartId ? cartId : '');
    return this._securedService.get(url);
  }

  /** Guest RFQ Enquiry download API */
  getUserDocs(rfqId,email,successCall, errorCall?){
    const url =  `dealer/v1/user-docs`;
    const options = { params: {sourceId: (rfqId ? rfqId : ''), emailId: (email ? email : '')} };
    this._guestService.get(url,options).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code && res.result.code === "2000") {
          successCall(res);
        } else {
          errorCall(res);
        }
    },
    err => {
      errorCall(err);
    });
  }
  //CR 415 SMOSS-36931 KTD- set test drive value
  /**
   * 
   *
   * @param {boolean} option
   * @memberof DealerService
   */
  setTestDrive(option:boolean){
    this.testDriveSelected.next(option);
  }
  //CR 415 SMOSS-36931 KTD- get test drive value
 /**
   * 
   *
   * @param {boolean} option
   * @memberof DealerService
   */
  getTestDrive() :Observable<Boolean>{
    return this.testDriveSelected;
  }
}
