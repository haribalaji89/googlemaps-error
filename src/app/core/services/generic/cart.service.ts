import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService  extends BaseHttpService {

  constructor(private http: HttpClient,private _userService: UserService) {
    super(http, 'secured/cart/v1');
  }

  public selectedCartId : any;

  getCartIds() {
    const userDetails = null;//localStorage.getItem('user-details') && this._userService.getLocalstorageData();
    const userId = userDetails ? userDetails.id : '';
    return this.get(`cart-ids${userId ? `?userId=${userId}` : ''}`);
  }

  saveConfig(payload) {
    return this.post(payload, 'save-cart');
  }

  getCartById(id) {
    return this.get(`cart?cartId=`+ id);
  }

  removeConfig(cartId) {
    return this.post({},`dcart?cartId=${cartId}`);
  }
  getReferenceid(payload){
    return this.post(payload,`cart-details-by-cartid-and-referenceid`)
  }

  // getfinancejson(){
  //   return this.http.get(`./assets/json/engage-finance.json`);
  // }
  //CR-598D Tiny Pod Changes- start
  getTinyPodCartDetails() {
    const userDetails = null;//localStorage.getItem('user-details') && this._userService.getLocalstorageData();
    const userId = userDetails ? userDetails.id : '';
    // return this.get(`cart-details${userId ? `?userId=${userId}` : ''}`);
  }
  // CR-598D Tiny Pod Changes- End
}
