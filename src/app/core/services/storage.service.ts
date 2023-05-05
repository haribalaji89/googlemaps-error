import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { COUNTRY } from 'environments/in/environment.dev';
//import { CryptoService } from './crypto.service';
import { UserService } from './generic/user.service';

declare var epaas: any;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = {};
  constructor(private router: Router, private _userService: UserService) { }

  /**
   * method to set user information expect token into local storage
   * @param user - from api call
   */
  setUser(user: any) {
    if (user) {
      const userInformation = {
        firstName: user['firstName'],
        id: user['id'],
        lastName: user['lastName'],
        userType: user['userType'],
        profileStatus:user['profileStatus']
      };
      if (user && user['token']) {
        localStorage.setItem('api-token', user['token']);
        /*CR-632 - Storing and fetching feedback details as per active session starts*/
        localStorage.setItem('active-user-token', user['token']);
        /*CR-632 - Storing and fetching feedback details as per active session ends*/
      }
      if (user && user['refreshToken']) {
        localStorage.setItem('refreshToken',user['refreshToken']);
      }
      // if(user && user[''])
      //localStorage.setItem('user-details', JSON.stringify(userInformation));
      //set user details for encryption
      //localStorage.setItem('user-details', this.cryptoService.Encrypt(userInformation));
    }
  }


  /**
   * method to set dealer information expect token into local storage
   * @param user - from api call
   */
  setDealerToken(user: any) {
     localStorage.setItem('dealer-api-token', user['token']);
  }

    /**
   * method to set dealer information expect token into local storage
   * @param user - from api call
   */
  setDealerData(user: any, id: number) {
    if (user) {
      const userInformation = {
        firstName: user.firstName,
        lastName: user.lastName,
        dealer: user.dealer,  // Dealer Outlet
        dealerCode: user.dealerCode,  // Dealer Outlet
        email: user.primaryEmail,
        userType: 'DEALER',
        title: user.role,
        mobilePhone: user.mobilePhone,
        parentDealer: user.parentDealer,
        parentDealerCode: user.parentDealerCode,
        'id': id,
        isKtdDealer:user.isKtdDealer?user.isKtdDealer:false //added for CR 415
      };

      //localStorage.setItem('dealer-details', JSON.stringify(userInformation));
      //set dealer-details for encryption
      //localStorage.setItem('dealer-details', this.cryptoService.Encrypt(userInformation));
    }
  }

  /**
   * method returns token from localstorage
   * @returns token - string
   */
  getToken() {
    return localStorage.getItem('api-token');
  }

  /**
   * method returns user details from localstorage
   * @returns user;
   */
  getUserDetails() {
    return localStorage.getItem('user-details')
      ? localStorage.getItem('user-details')
      : null;
  }

  /**
   * Method to clear all local storage on logout
   */
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  /**
   * Method to check whether the user is logged or not
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * To store mobile no into the local storage
   * @param mobileNo: string
   */
  setMobile(mobileNo: string) {
    localStorage.setItem('mobile-no', mobileNo);
  }

  /**
   * To store mobile no into the local storage
   * @return mobileNo: string
   */
  getMobile() {
    return localStorage.getItem('mobile-no');
  }

  /**
  * To store email id into the local storage
  * @param email: string
  */
  setEmail(email: string) {
    localStorage.setItem('email-id', email);
  }

  /**
   * To store email id into the local storage
   * @return email: string
   */
  getEmail() {
    return localStorage.getItem('email-id') ? localStorage.getItem('email-id') : null;
  }

  /**
   * Get Name from local storage
   * @return name: string
  */
  getName() {
    return localStorage.getItem('name');
  }

  /**
   * To store Name into the local storage
   * @param name: Object
   */
  setName(name: any) {
    localStorage.setItem('name', JSON.stringify(name));
  }

  /**
   * To store User Data After registration into the local storage
   * @param user: Object
  */
  setRegisteredUser(user: any) {
    if (user) {
      const userInformation = {
        firstName: user['firstName'],
        lastName: user['lastName'],
        mobileNumber: user['mobileNumber'],
        email: user['email'],
        createdBy: user['createdBy'],
        sendEmail: user['sendEmail'],
        sendSms: user['sendSms']

      };
      localStorage.setItem('registered-user', JSON.stringify(user));
    }
  }

  /**
   * Get Registered User from local storage used in email verfication page
   * @return user: Object
  */
  getRegisteredUser() {
    return localStorage.getItem('registered-user')
    ? JSON.parse(localStorage.getItem('registered-user')) : null ;
  }

  /**
   * to store model information
   * @param model - string
   */
  setModelConfig(model: string) {
    localStorage.setItem('MODEL_CONFIG', model);
  }

  setModelDupConfig(model: string) {
    localStorage.setItem('MODEL_CONFIG_DUP', model);
  }

  setModelDetail(model: any) {
    localStorage.setItem('model-details', JSON.stringify(model));
  }

  //CR-146 edit profile page for SG
  setEditProfile(model: any) {
    localStorage.setItem('edit-profile', JSON.stringify(model));
  }
  setCurrentModel(model: any) {
    localStorage.setItem('current-model', JSON.stringify(model));
  }


  /**
   * To get information of car model
   * @return model
   */
  getModelConfig() {
    return localStorage.getItem('MODEL_CONFIG');
  }

  getModelDupConfig() {
    return localStorage.getItem('MODEL_CONFIG_DUP');
  }

    /**
   * to store model information from Online special edition
   * @param model - string
   */
  setSpecialEditionModelConfig(model: string) {
    localStorage.setItem('SPL_EDITION_MODEL_CONFIG', model);
  }

  /**
   * To get information of car model
   * @return model
   */
  getSpecialEditionModelConfig() {
    return localStorage.getItem('SPL_EDITION_MODEL_CONFIG');
  }

  /**
   * Method to remove a particular key from local storage
   * @param key - string
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Method to get a particular value from local storage
   * @param key
   */

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key, value) {
    localStorage.setItem(`${key}`, value);
  }

  /**
   * Clear All Local Storage Items
  */
  removeAllItems() {
    localStorage.clear();
  }






  /*added for buy now component -u51680*/
  addString(key, value) {
    if (typeof Storage !== 'undefined') {
        localStorage.setItem(key, value);
    } else {
        this.storage[key] = value;
    }
}

getString(key): string {
    let value;
    if (typeof Storage !== 'undefined') {
        value = localStorage.getItem(key);
    } else {
        value = this.storage[key];
    }
    return value;
}

addObject(key, valueObj) {
    if (typeof Storage !== 'undefined') {
      if(key == 'pre-book' || key == 'pre-booking' || key == 'oem-userdetails'){
        localStorage.setItem(key, valueObj);
      }
      else{
        localStorage.setItem(key, JSON.stringify(valueObj));
      }
    } else {
        this.storage[key] = valueObj;
    }
}

getObject(key): any {
    let value = {};
    if (typeof Storage !== 'undefined') {
      if(key == 'pre-book' || key == 'pre-booking' || key == 'oem-userdetails'){
        value = localStorage.getItem(key) ? localStorage.getItem(key) : null;
      }
      else{
        value = JSON.parse(localStorage.getItem(key));
      }
    } else {
        value = this.storage[key];
    }
    return value;
}

  setSelectedDealer(selectedDealer: any) {
    if (selectedDealer) {
      localStorage.setItem('selected-dealer', JSON.stringify(selectedDealer));
    }
  }

  setRecommendedModelSelectedDealer(selectedRMDealer: any) {
    if (selectedRMDealer) {
      localStorage.setItem('selected-rm-dealer', JSON.stringify(selectedRMDealer));
    }
  }

  getFavoriteDealer() {
    return localStorage.getItem('fav-dealer');
  }

    /**
   * Method to check whether the user have favourite dealer
   */
  hasFavDealer(): boolean {
    return !!this.getFavoriteDealer();
  }

  deleteGuestCart(cartId) {
    let config = this.getGuestConfig();
    delete config[cartId];
    if(COUNTRY.COUNTRY_CODE !== 'sg' && COUNTRY.COUNTRY_CODE !== 'in_mini' && COUNTRY.COUNTRY_CODE !== 'indo') {
      if(epaas.api.isUsageAllowed('SMOSS_Consent')) {
      localStorage.setItem('guest-config-details', JSON.stringify(config));
    }
   } else {
    localStorage.setItem('guest-config-details', JSON.stringify(config));
   }
  }

  setGuestCartDealer(cartId: any, selectedDealer: any) {
    if (cartId && selectedDealer) {
      const config = this.getGuestConfig();
      let cartDealers = [];
      if (config && config[cartId]) {
        cartDealers = config[cartId];
        let existingDealer:any;
        let existingDealerId:any;
        if (cartDealers && cartDealers.length > 0) {
          if(selectedDealer.id)
            selectedDealer.dealerId=selectedDealer.id;
          existingDealer = cartDealers.filter( item => (item.id || item.dealerId) === selectedDealer.dealerId)[0];
          existingDealerId = existingDealer.id || existingDealer.dealerId;
          if (!(existingDealer && existingDealerId)) {
            cartDealers.push(selectedDealer);
          }
          
        } else {
          cartDealers.push(selectedDealer);
        }

        this.setGuestConfig(cartId, cartDealers);
      } else {
        this.setGuestConfig(cartId, []);
        this.setGuestCartDealer(cartId, selectedDealer);
      }
    }
  }

  getGuestCartDealer(cartId: any) {
    const configDetails = this.getGuestConfig();
    if (configDetails && configDetails[cartId]) {
      return configDetails[cartId];
    } else {
      return [];
    }
  }

  deleteGuestCartDealer(cartId: any, selectedDealer: any) {
    if (cartId && selectedDealer) {
      const config = this.getGuestConfig();
      let cartDealers = [];
      if (config && config[cartId]) {
        cartDealers = config[cartId];
        const dealers = JSON.parse(JSON.stringify(config[cartId]));
        if (dealers && dealers.length > 0) {
          for (let i = 0; i < dealers.length; i++) {
            let dealer = dealers[i];
            if (dealer.dealerId === selectedDealer.dealerId) {
              cartDealers.splice(i, 1);
              break;
            }
          }
        }
        this.setGuestConfig(cartId, cartDealers);
      }
    }
  }

  updateGuestCartDealerDetails(cartId: any, selectedDealer: any) {
    if (cartId && selectedDealer) {
      this.deleteGuestCartDealer(cartId, selectedDealer);
      this.setGuestCartDealer(cartId, selectedDealer);
    }
  }

  deleteGuestConfig() {
    localStorage.removeItem('guest-config-details');
  }

  setGuestConfig(cartId: any, dealers: any) {
    // let config = {};
    let config = this.getGuestConfig();
    config[cartId] = dealers;
    if(COUNTRY.COUNTRY_CODE !== 'sg' && COUNTRY.COUNTRY_CODE !== 'in_mini' && COUNTRY.COUNTRY_CODE !== 'indo') {
      if(epaas.api.isUsageAllowed('SMOSS_Consent')) {
      localStorage.setItem('guest-config-details', JSON.stringify(config));
    }
   } else {
    localStorage.setItem('guest-config-details', JSON.stringify(config));
   }
  }

  getGuestConfig() {
    const configDetails = JSON.parse(localStorage.getItem('guest-config-details'));
    if (configDetails) {
      return configDetails;
    } else {
      return {};
    }
  }

  setAdminPortalContent(content: any) {
    localStorage.setItem('admin-portal-content', content)
  }

  getAdminPortalContent() {
    return JSON.parse(localStorage.getItem('admin-portal-content'))
  }

  setTotalPackagePrice(price: number) {
    localStorage.setItem('totalPackagesPrice', price + '');
  }

  getTotalPackagePrice() {
    return localStorage.getItem('totalPackagesPrice') ? localStorage.getItem('totalPackagesPrice') : null;
  }
}
