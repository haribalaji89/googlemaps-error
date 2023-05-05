import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BaseHttpService } from '../base-http.service';

/**
 * Name: UserService
 * params: HttpClient
 * basepath: bmw/user
 * desc: User services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  public userDetails: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    super(http, 'bmw/user');
   }

  public setUserDetails(data: any) {
    this.userDetails.next(data);
  }

  //SMOSS-66004 Insecure randomness change
   //Method to generate rrandom numners of length 4 t0 12 digits only
   generateRandomNumbers(n){
    const array = new Uint32Array(1);
    let num: any = self.crypto.getRandomValues(array);
    num = num[0] * 999;
    const slicenum = String(num).slice(0,n);
    return Number(slicenum);
  }
}
