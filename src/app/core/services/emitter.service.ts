import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EmitterService {
    private _isLoggedInSource = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedInSource.asObservable();
  
    private _navigationSource = new BehaviorSubject<boolean>(false);
    navigation$ = this._navigationSource.asObservable();

    private _isProfileEditable = new BehaviorSubject<boolean>(false);
    isProfileEditable$ = this._isProfileEditable.asObservable();

    private _customerDealerChatSource = new BehaviorSubject<any>(false);
    customerDealerChat$ = this._customerDealerChatSource.asObservable();

    private _tokenExpiredSource = new BehaviorSubject<boolean>(false);
    tokenExpired$ = this._tokenExpiredSource.asObservable();

    private _isDealerLoggedInSource = new BehaviorSubject<boolean>(false);
    isDealerLoggedIn$ = this._isDealerLoggedInSource.asObservable();

    private _dealerPendingMessageSource = new BehaviorSubject<boolean>(false);
    dealerPendingMessage$ = this._dealerPendingMessageSource.asObservable();

    private _customerPendingMessageSource = new BehaviorSubject<boolean>(false);
    customerPendingMessage$ = this._customerPendingMessageSource.asObservable();

    private _productVariantOfferSource = new BehaviorSubject<boolean>(false);
    productVariantOffer$ = this._productVariantOfferSource.asObservable();
    private _myConfigsAnalyticsEventSource = new BehaviorSubject<any>(false);
    myConfigsAnalyticsEvent$ = this._myConfigsAnalyticsEventSource.asObservable();

    private _feedbackEventSource = new BehaviorSubject<any>(false);
    feedbackEvent$ = this._feedbackEventSource.asObservable();

    private _prebookStatusSource = new BehaviorSubject<boolean>(false);
    prebookStatus$ = this._prebookStatusSource.asObservable();

    private _profileNotificationSource = new BehaviorSubject<boolean>(false);
    profileNotification$ = this._profileNotificationSource.asObservable();

    private _userChatLive = new BehaviorSubject<any>(false);
    userChatLive$ = this._userChatLive.asObservable();

    private _getChatData = new BehaviorSubject<any>(false);
    getChatData$ = this._getChatData.asObservable();

    private _removeChat = new BehaviorSubject<any>(false);
    removeChat$ = this._removeChat.asObservable();

    private _modelsData = new BehaviorSubject<any>(false);
    modelsData$ = this._modelsData.asObservable();

    private _logoFlag = new BehaviorSubject<any>(false);
    logoFlag$ = this._logoFlag.asObservable();

    private _location = new BehaviorSubject<any>(true);
    locationData$ = this._location.asObservable();

    private _userLocationPopup = new BehaviorSubject<any>(false);
    _userLocationPopup$ = this._userLocationPopup.asObservable();

    private _dealerSelection = new BehaviorSubject<any>(false);
    _dealerSelection$ = this._dealerSelection.asObservable();

    private _dealerSelectionPopup = new BehaviorSubject<any>(false);
    _dealerSelectionPopup$ = this._dealerSelectionPopup.asObservable();

    private _userLocationPopupForCon = new BehaviorSubject<any>(false);
    _userLocationPopupForCon$ = this._userLocationPopupForCon.asObservable();
    
    private _updateSaveIcon = new BehaviorSubject<any>(false);
    _updateSaveIcon$ = this._updateSaveIcon.asObservable();

    private _onNavbarShown = new BehaviorSubject<any>(false);
    _onNavbarShown$ = this._onNavbarShown.asObservable();

    private _isLoggedInDT = new BehaviorSubject<any>(false);
    _isLoggedInDT$ = this._isLoggedInDT.asObservable();

    private _postCode = new BehaviorSubject<any>(false);
    postCode$ = this._postCode.asObservable();

    updatePostCode(value) {
        this._postCode.next(value);
    }
    private _configSettings = new BehaviorSubject<any>(false);
    _configSettings$ = this._configSettings.asObservable();

    updateSaveStatus(value){
        this._updateSaveIcon.next(value);
    }

    updateLoginStatus(value) {
        this._isLoggedInSource.next(value);
    }

    updateProfileEditable(value) {
        this._isProfileEditable.next(value);
    }

    updateNavigation(value) {
        this._navigationSource.next(value);
    }

    updateDealerChatStatus(flag, dealerID, value) {
        this._customerDealerChatSource.next({flag, dealerID, value });
    }

    updateDealerLoginStatus(value) {
        this._isDealerLoggedInSource.next(value);
    }

    updateDealerPendingMessageStatus(value) {
        this._dealerPendingMessageSource.next(value);
    }

    updateCustomerPendingMessagesStatus(value){
        this._customerPendingMessageSource.next(value);
    }

    tokenHasExpired(value) {
        this._tokenExpiredSource.next(value);
    }

    updpateFeedback(value) {
        this._feedbackEventSource.next(value);
    }

    updateProductVariantOffers(value) {
        this._productVariantOfferSource.next(value);
    }
    updateMyConfigsAnalyticsEventSource(configAnalyticsType, value, extraKey) {
        this._myConfigsAnalyticsEventSource.next({configAnalyticsType, value, extraKey});
    }

    updateprebookStatus(value) {
        this._prebookStatusSource.next(value);
    }

    profileNotificationChange(value) {
        this._profileNotificationSource.next(value);
    }

    updateChatLive(value) {
        this._userChatLive.next(value);
    }

    setChatData(value){
         this._getChatData.next(value);
    }

    removeChat(value) {
        this._removeChat.next(value);
    }

    setModelsData(value) {
        this._modelsData.next(value);
    }

    updateLogoFlag(value){
        this._logoFlag.next(value);
    }

    updateLocation(value){
        this._location.next(value);
    }
    toggleUserLocationPopup(value){
      this._userLocationPopup.next(value);
    }
    triggerUserLocPopup(value){  
        this._dealerSelection.next(value);
    }    

    dealerSelectionPopup(value){
        this._dealerSelectionPopup.next(value);
    }  
    
    conUserLocationPopup(value){
        this._userLocationPopupForCon.next(value);
    }

    onNavbarShown(value) {
        this._onNavbarShown.next(value);
    }

    triggerIsLoggedInDT(value){
        this._isLoggedInDT.next(value);
    }

    sendConfigSettings(value) {
        this._configSettings.next(value);
    }

}
