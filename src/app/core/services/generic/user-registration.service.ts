import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';
import { GuestService } from './guest.service';
import { SecuredService } from './secured.service';

@Injectable()
export class UserRegistrationService {
private apiVersionTwo:string='user-reg-v2/v2/';
private apiVersionThree:string='user-reg-v2/v3/';
  constructor(
    private generalService: GeneralService,
    private guestService: GuestService,
    private securedService: SecuredService
  ) { }

  public getCityStateFromPincode(pincode: string): Observable<any> {
    let url = `${this.apiVersionTwo}city-state-from-pincode/${pincode}`
    return this.generalService.get(url);
  }

  public sendEmailOTP(emailId: string, mobileNumber: string, eventType: string): Observable<any> {
    let url = `${this.apiVersionTwo}user-email-otp`;
    let body = {
      email: emailId,
      eventType: 'guestValidateOtp',
      mobileNumber: mobileNumber
    }
    return this.guestService
      .post(body, url);
  }

  public validateEmail(emailId: string): Observable<any> {
    let body = { email: emailId };
    let url = `${this.apiVersionTwo}guest-user-details`;
    return this.securedService.post(body, url)
  }

  public resendMobileOTP(mobileNumber: string, eventType: string): Observable<any> {
    let url = `${this.apiVersionTwo}user-email-otp`;
    let body = {
      eventType: eventType,
      mobileNumber: mobileNumber
    };
    return this.guestService.post(body, url);
  }

  public guestRegistration(body: any): Observable<any> {
    let url = `${this.apiVersionTwo}guest-registration`;
    return this.securedService
      .post(body, url);
  }

  public validateOTP(otp: string, targetId: string, eventType: string): Observable<any> {
    let url = `${this.apiVersionThree}user-validate-otp`;
    let body = { otp: otp, targetId: targetId, eventType: eventType };
    return this.generalService.post(body, url);
  }

  public resendEmailOTP(emailId: string, eventType: string): Observable<any> {
    let url = `${this.apiVersionTwo}user-email-otp`;
    let body = {
      email: emailId,
      eventType: eventType,
    }
    return this.guestService.post(body, url);
  }

  public userValidateOpt(body: object): Observable<any> {
    let apiUrl = 'user-reg-v2/v3/user-validate-otp'
    return this.generalService.post(body, apiUrl);
  }
}
