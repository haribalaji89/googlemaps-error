import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartV2Service  extends BaseHttpService {

  constructor(private http: HttpClient,private _userService: UserService) {
    super(http, 'secured/cart/v2');
  }

  public selectedCartId : any;
  //CR-598D Tiny Pod Changes- start
  
  getTinyPodCartDetails() {
    const userDetails = localStorage.getItem('user-details') && this._userService.getLocalstorageData();
    const userId = userDetails ? userDetails.id : '';
    return this.get(`cart?${userId ? `userId=${userId}&` : ''}count=0&startIndex=0`);

  }
  getCartByIdV2(id) {
    const userDetails = localStorage.getItem('user-details') && this._userService.getLocalstorageData();
    const userId = userDetails ? userDetails.id : '';
    return this.get(`cart?${userId ? `userId=${userId}&` : ''}count=0&startIndex=0&cartId=${id}`);
  }
  // CR-598D Tiny Pod Changes- End
}
