import { Injectable } from '@angular/core';
import { COUNTRY } from 'environments/in/environment.dev';

import { StorageService } from '../storage.service';
import { SecuredService } from './secured.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';



@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private _storageService: StorageService, private _securedService: SecuredService, private http: HttpClient, private _cartService: CartService) { }

    getSessionImage() {
        const modelConfig = this._storageService.getModelConfig();
        if (modelConfig) {
            if(JSON.parse(modelConfig).configuration) {
                return JSON.parse(modelConfig).configuration.currentImage;
            } else {
                return JSON.parse(modelConfig).productImageUrl;
            }
        }
        return '';

    }

    validateOffer(offerData) {
        let valid = false;
        if (offerData && offerData.to) {
            const now = new Date();
            if (now.getTime() >= (new Date(offerData.from)).getTime() && now.getTime() <= (new Date(offerData.to)).getTime()) {
                valid = true;
            }
        }
        return valid;
    }

    getModelOffers(): any {
        const offers = {
            'KS42_1': {
                'description': [
                    'Get an additional benefit of ₹ 1 lakh on online bookings',
                    'Customer interest rate of 8.49%**',
                    '3-year complimentary service and maintenance',
                    'Exchange Bonus of ₹ 10 Lakh'
                ]
            }
        };
        return offers;
    }


    submitConfiguration(config) {
        // return this._securedService.post(config, 'customer-journey/' + COUNTRY.COUNTRY_CODE + '/v1/insert-configuration');
        return this._cartService.saveConfig(config);
    }

    modifyDealerList(data:any){
        let activeDealerList = JSON.parse(this._storageService.getObject('activeDealerList'));
        data.forEach(eachDealerList=>{
          if(activeDealerList && activeDealerList.length !== 0){
            if(activeDealerList && activeDealerList.includes(eachDealerList.parentDealerCode)){
              eachDealerList.showActiveDealerMessage = false;
            }else if(activeDealerList.includes('0')){
                eachDealerList.showActiveDealerMessage = null;
            }
            else{
              eachDealerList.showActiveDealerMessage = true;
            }
          }
        });
        console.log('data',data);
        return data;
      }

}
