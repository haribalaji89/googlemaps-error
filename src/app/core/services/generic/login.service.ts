import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'general/login-v2');
  }

  public authenticateUser(payload) {
    return this.post(payload, 'authenticate');
  }

  public authenticateGcdmUser(payload) {
    return this.post(payload, 'authenticate/auth-code');
  }

  public resetUserData(username, options?) {
    if (options) {
      return this.get('user-reset-send-token-email/' + username, options);
    } else {
      return this.get('user-reset-send-token-email/' + username);
    }
  }

  public userSessionLogout(payload) {
    return this.post(payload, 'user-session-logout');
  }

  public resetPassword(payload) {
    return this.post(payload, 'user-reset-password');
  }

  public dealerSessionLogout(payload) {
    return this.post(payload, 'dealer-session-logout');
  }

  public dealerForgetPassword(payload) {
    return this.post(payload, 'dealer-forgot-pwd');
  }

  public authenticateDealer(payload) {
    return this.post(payload, 'dealer-authenticate');
  }

  public refreshToken(){
    return this.post({},'refresh-token-v2');
  }
  // public logout(payload) {
  //   return this.post(payload, 'logout');
  // }

  // public changePassword(payload) {
  //   return this.post(payload, 'change-password');
  // }
}
