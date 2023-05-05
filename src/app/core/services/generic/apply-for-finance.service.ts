// CR-342_2-Aug-21-Release – Redirection to VFI - Start

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { StorageService } from '../storage.service';
import { vfiConstants } from '@shared/constants/vfi-constants';
import { BaseHttpService } from '../base-http.service';
import { DatePipe } from '@angular/common';
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ApplyForFinanceService extends BaseHttpService {

  userLocationDetails: any;
  private eventCallback = new BehaviorSubject<boolean>(true);
  eventCallback$ = this.eventCallback.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService, private datePipe: DatePipe) { 
    super(http, 'general/stock-locator/v1');
  }

  public getVFIData(vfiPayload: any): Observable<any> {
    return this.post(vfiPayload, `applyForFinance`);
  }

  redirectToVfi(userType: any, vehicleDetails: any, priceDetails: any, configData: any) {
    this.userLocationDetails = this.checkStorageForLocationDetails();
    const vehiclePrice = vehicleDetails ? vehicleDetails.price : null;
    const configPrice = configData ? (configData.product ? configData.product.netPriceTree.netPrice : null) : null
    if (vehicleDetails && !vehiclePrice) {
      this.priceNotAvailable();
    } else if (configData && !configPrice) {
      this.priceNotAvailable();
    } else {
      this.postVfiData(userType, vehicleDetails, priceDetails, configData);
    }
  }

  postVfiData(userType: any, vehicleDetails: any, priceDetails: any, configData: any) {
    const vfiPayload = this.getVfiPayload(vehicleDetails, priceDetails, configData);
    this.getVFIData(vfiPayload).subscribe(
      (res: any) => {
        if (res && res.result && res.result.code === vfiConstants.successCode && res.data && Object.keys(res.data).length > 0) {
          this.eventCallback.next(false);
          if (res.data.RedirectionURL && res.data.RedirectionURL != '') {
            if (userType !== "guest") {
              // const url = res.data.RedirectionURL + "&openid=Y"; 
              window.open(res.data.RedirectionURL, '_blank'); // SMOSS-62650 vfi API changes
            } else {
              window.open(res.data.RedirectionURL, '_blank');
            }
          }
        } else {
          this.eventCallback.next(false);
          window.open(res.data.RedirectionURL, '_blank'); // SMOSS-62650 vfi API changes
        }
      }, err => {
        console.log("VFI Error", err);
        this.priceNotAvailable();
      });
  }

  priceNotAvailable() {
    this.eventCallback.next(false);
    this.navigateToStdVfiPage();
  }

  navigateToStdVfiPage() {
    window.open(vfiConstants.stdVfiUrl, '_blank');
  }

  getDateFormatted(date: string) {
    const prodDate = new Date(date);
    return this.datePipe.transform(prodDate,"dd-MM-yyyy");
  }

  getVfiPayload(vehicleDetails: any, priceDetails: any, configData: any) {
    return {
      ReferenceId: "",
      isLimitedParams: configData ? true : false,
      Channel: vfiConstants.channel,
      VehicleUniqueIdentifier: vehicleDetails ? (vehicleDetails.vin ? vehicleDetails.vin : '') : configData ? (configData.cart ? configData.cart.vin : '') : '',
      VehicleUniqueIdentifierType: vfiConstants.vinType,
      PostCode: this.userLocationDetails && this.userLocationDetails.pincode ? this.userLocationDetails.pincode : '',
      NSCDealerId: vehicleDetails ? (vehicleDetails.dealerCode ? vehicleDetails.dealerCode : '') : '',
      RedirectionURL: window.location.href ? window.location.href : '',
      FinanceParameters: {
        Deposit: "0",
        Term: "0",
        Balloon: "0",
        Campaign: "0",
        KMAllowance: "0",
        Product: "0",
        Frequency: vfiConstants.frequency,
        DriveAwayPrice: vehicleDetails ? this.formatValue(vehicleDetails.price) : configData ? (configData.product && configData.product.netPriceTree ? this.formatValue(configData.product.netPriceTree.netPrice) : '') : '',
        TradeInValue: "0"
      },
      VehicleParameters: {
        State: this.userLocationDetails ? (this.userLocationDetails.state ? this.userLocationDetails.state : '') : '',
        Usage: vehicleDetails ? (vehicleDetails.usageState ? vehicleDetails.usageState : '') : '', // SMOSS-62650 vfi API change - value from vss
        Odometer: 1,
        Make: vehicleDetails ? (vehicleDetails.brand ? vehicleDetails.brand : '') : configData ? (configData.product ? configData.product.brand : '') : '',
        Ecode: vehicleDetails ? (vehicleDetails.modelCode ? vehicleDetails.modelCode : '') : configData ? (configData.product ? configData.product.modelCode : '') : '',
        Ecode_model: vehicleDetails ? (vehicleDetails.modelName ? vehicleDetails.modelName : '') : '',
        Series: vehicleDetails ? (vehicleDetails.vehicle ? (vehicleDetails.vehicle.series ? vehicleDetails.vehicle.series : '') : '') : configData ? (configData.product ? configData.product.seriesCode : '') : '',
        Model: vehicleDetails ? (vehicleDetails.modelName ? vehicleDetails.modelName : '') : configData ? (configData.product ? configData.product.modelName : '') : '',
        Line: "",
        Body_type: vehicleDetails ? (vehicleDetails.vehicle ? (vehicleDetails.vehicle.bodyType ? vehicleDetails.vehicle.bodyType : '') : '') : configData ? (configData.product ? configData.product.bodyTypeCode : '') : '',
        Model_code: vehicleDetails ? (vehicleDetails.agModelCode ? vehicleDetails.agModelCode : '') : configData ? (configData.product ? configData.product.agModelCode : '') : '',
        Interior_colour: vehicleDetails ? (vehicleDetails.upholsteryAndTrims ? (vehicleDetails.upholsteryAndTrims.interior ? (vehicleDetails.upholsteryAndTrims.interior.name ? (vehicleDetails.upholsteryAndTrims.interior.name) : '') : '') : '') : '',
        Exterior_colour: vehicleDetails ? (vehicleDetails.paints ? (vehicleDetails.paints.exterior ? (vehicleDetails.paints.exterior.name ? (vehicleDetails.paints.exterior.name) : '') : '') : '') : '',
        Lct_flag: vfiConstants.lctFlag,
        Build_date: vehicleDetails ? (vehicleDetails.productionDate ? this.getDateFormatted(vehicleDetails.productionDate) : '') : '',
        Msrp_lct: priceDetails ? this.formatValue(priceDetails.lct) : '',
        Msrp: priceDetails ? this.formatValue(priceDetails.listPlusGst) : '',
        Total_options: priceDetails ? this.formatValue(priceDetails.options) : '',
        Msrp_ex_taxes: "0",
        Total_options_ex_taxes: "0",
        Msrp_plus_options_ex_taxes: "0",
        On_road_price: vehicleDetails ? this.formatValue(vehicleDetails.price) : configData ? (configData.product && configData.product.netPriceTree ? this.formatValue(configData.product.netPriceTree.netPrice) : '') : '',
        Image_URL: vehicleDetails ? (vehicleDetails.vehicleImage ? vehicleDetails.vehicleImage : '') : configData ? (configData.cart ? configData.cart.productImageUrl : '') : '',
        BPC_Flag: vfiConstants.bpcFlag,
        Description_of_model: vehicleDetails ? (vehicleDetails.modelName ? vehicleDetails.modelName : '') : configData ? (configData.product ? configData.product.modelName : '') : '',
        Compliance_date: vehicleDetails ? (vehicleDetails.productionDate ? this.getDateFormatted(vehicleDetails.productionDate) : '') : '',
        Msrp_plus_options: priceDetails ? (this.formatValue(priceDetails.listPlusGst) + this.formatValue(priceDetails.options)) : '',

        Options: {
          Factory_options: priceDetails ? (priceDetails.optionDetails ? priceDetails.optionDetails.factory_options : '') : '',
          Packages_fitted: priceDetails ? (priceDetails.optionDetails ? priceDetails.optionDetails.packages_fitted : '') : '' 
        }
      }
    }
  }

  formatValue(val) {
    if (val === 0 || val === 1 || val) {
      return val;
    } else if (val === null || val === undefined || val === '') {
      return '';
    }
  }

  checkStorageForLocationDetails() {
    let userLocationDetails = JSON.parse(this.storageService.getItem('location'));
    if (!userLocationDetails ||
      (!userLocationDetails['state'] || userLocationDetails['state'] === '') ||
      (!userLocationDetails['city'] || userLocationDetails['city'] === '') ||
      (!userLocationDetails['pincode'] || userLocationDetails['pincode'] === '')) {
      return false;
    } else {
      return userLocationDetails;
    }
  }

}

// CR-342_2-Aug-21-Release – Redirection to VFI - End
