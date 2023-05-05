import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { SecuredService } from './secured.service';
import { GuestService } from './guest.service';

@Injectable({
  providedIn: 'root'
})
export class TestDriveService  {

  constructor(private http: HttpClient,
    private _securedService: SecuredService,
    private _guestService: GuestService) {  }

  public fetchTestDriveDetailsByCartId(cartId, userId) {
    if(localStorage.getItem('sessid')){
      return this._securedService.get(`testdrive/v1/fetch-test-drive-details-by-cart-id${cartId ? `?cartId=${cartId}` : ''}`);
    } else
    return this._securedService.get('testdrive/v1/fetch-test-drive-details-by-cart-id/' + cartId + '/' + userId);
  }

  public saveTestDriveRequest(payload) {
    return this._securedService.post(payload, 'testdrive/v1/test-drive');
  }

  public requestTestDriveForModel(payload) {
    return this._securedService.post(payload, 'testdrive/v1/anon-test-drive');
  }
}
