import { Injectable } from '@angular/core';
import { COUNTRY, environment } from 'environments/in/environment.dev';
import { countryCodes } from '@shared/components/content-select/schemas/country-code';
@Injectable({
  providedIn: 'root'
})
export class PreprocessorService {
  public countryCode = COUNTRY.COUNTRY_CODE;


  processAllSeries(data): any[] {
    try {
      let allSeries: any[] = Object.keys(data.data).map(key => {
        if (data.data[key].seriesName) {
          return {
            name: key,
            value: data.data[key]
          };
        }
      });
      allSeries = allSeries.filter(d => d);
      return allSeries;
    } catch (e) {
      console.error(e);
    }
  }

  processExclusiveModel(data): any[] {
    try {
      let onlineExclusiveModels: any[] = Object.keys(data.data).map(key => {
        if (data.data[key].seriesName) {
          return {
            name: key,
            value: data.data[key]
          };
        }
      });
      onlineExclusiveModels = onlineExclusiveModels.filter(d => d);
      return onlineExclusiveModels;
    } catch (e) {
      console.error(e);
    }
  }



  processRangeModelOptions(data, currentRange): any[] {
    const allModels: any[] = Object.keys(data.availableModels).map(key => {
      return {
        name: key,
        value: data.availableModels[key]
      };
    });
    if (allModels && allModels[0]) {
      allModels.forEach(eachModel => {
        eachModel.exteriorNonMetalicList = Object.keys(eachModel.value.paintDetails)
          .filter(key1 =>
            this.getPaintDetails(eachModel.value.paintDetails[key1], eachModel.value.allOptionDetails[key1]) === 'EXTERIOR_NON_METALIC')
          .map(key => {
            return {
              name: key,
              value: eachModel.value.paintDetails[key]
            };
          });
        eachModel.exteriorMetalicList = Object.keys(eachModel.value.paintDetails)
          .filter(key1 =>
            this.getPaintDetails(eachModel.value.paintDetails[key1], eachModel.value.allOptionDetails[key1]) === 'EXTERIOR_METALIC')
          .map(key => {
            return {
              name: key,
              value: eachModel.value.paintDetails[key]
            };
          });
        eachModel.interiorList = Object.keys(eachModel.value.fabricDetails)
          .map(key => {
            eachModel.value.fabricDetails[key].extraData = eachModel.value.allOptionDetails[key];
            return {
              name: key,
              value: eachModel.value.fabricDetails[key]
            };
          });

        
        eachModel.selectedOptions = {};
        eachModel.selectedOptions.exterior = {};
        eachModel.selectedOptions.interior = {};

        const selectedData = (currentRange.modelList && currentRange.modelList[0]) ? currentRange.modelList.filter(m => m.name === eachModel.name) : null;
        if (selectedData && selectedData.length > 0) {
          selectedData[0].extraDescriptionData = eachModel;
        }
      });
    }

    currentRange.modelList = (currentRange.modelList && currentRange.modelList[0]) ? currentRange.modelList.filter(model => model.extraDescriptionData ) : [];

    return allModels;
  }
  getPaintDetails(source, extraData): string {
    let paintType = 'EXTERIOR_NON_METALIC';
    source.extraData = extraData;
    if (extraData.paintType && extraData.paintType === 'M') {
      paintType = 'EXTERIOR_METALIC';
    }
    return paintType;
  }


  modelPageBannersFromAdminPortal(data) {
    const offers = {};
    if (data && data.banners && data.banners.banners) {
      data.banners = JSON.parse(data.banners.banners);
      data.banners.forEach(element => {
        // if(element.targetPage === 'Model Page') {
        if (element.targetPage === 'All Models Page') {
          element.bannerText = element.bannerText.split('\n');
          if (element.campaign) {
            const campaign = JSON.parse(element.campaign.value);
            if (campaign) {
              element.fontColor = campaign.fontColor;
              element.bannerSubTitle = campaign.bannerSubTitle;
            }
          }
          offers[element.modelRange] = element;
        }
      });
    }
    return offers;
  }

  processOfferPrice(offerData, catalogData) {
    if (offerData && offerData.length > 0) {
      offerData.forEach(x => {
        catalogData && catalogData.map((item,index) => {
          if (item.name === x.seriesCode) {
              item.value.models.map(( model,idx)=> {
              if (x.modelRangeCode === model.modelCode) {
                if (x.offerAmount) {
                  model.minOfferPrice = model.minPrice - x.offerAmount;
                } else if (x.discountPercentage) {
                  model.minOfferPrice = model.minPrice - model.minPrice * (x.discountPercentage / 100);;
                }
                  model.variants.map(( variant,idx)=> {
                  if (x.modelCode === variant.variantCode) {
                        let calVal: any;
                        if (x.offerAmount) {
                          calVal = variant.exShowroomPrice ? (variant.exShowroomPrice - x.offerAmount) : null;

                          /* Calculate tax & Total price if any offer */
                          if (this.countryCode === countryCodes.japan) {
                            variant.totalTaxes = calVal + variant.taxes;
                          }
                        } else if (x.discountPercentage) {
                          calVal = variant.exShowroomPrice ? (variant.exShowroomPrice - variant.exShowroomPrice * (x.discountPercentage / 100)) : null;

                          /* Calculate tax & Total price if any offer */
                          if (this.countryCode === countryCodes.japan) {
                            variant.totalTaxes = calVal + variant.taxes;
                          }
                        }
                        if (x.applyToOfferTag) {
                          variant.applyToOfferTag = x.applyToOfferTag;
                          variant.textOnOfferTag = x.textOnOfferTag;
                        }
                        if (x.applyToDisclamer) {
                          variant.applyToDisclamer = x.applyToDisclamer;
                        }

                        variant.offerPrice = this.countryCode === countryCodes.japan ? (variant.totalTaxes) : calVal;
                  }
                });
              }
            });
          }
        });
      });
    }
  }

  processOfferPriceForModel(offerData, model) {

    if (offerData && offerData.length > 0) {

      offerData.forEach(x => {
          if (model.seriesCode === x.seriesCode) {
              if (x.modelRangeCode === model.modelCode) {
                if (x.offerAmount) {
                  model.minOfferPrice = model.minPrice - x.offerAmount;
                } else if (x.discountPercentage) {
                  model.minOfferPrice = model.minPrice - model.minPrice * (x.discountPercentage / 100);;
                }
                  if (x.modelCode === model.variantCode) {
                        let calVal: any;
                        if (x.offerAmount) {
                          calVal = model.exShowroomPrice ? (model.exShowroomPrice - x.offerAmount) : null;

                          /* Calculate tax & Total price if any offer */
                          if (this.countryCode === countryCodes.japan) {
                            model.totalTaxes = calVal + model.taxes;
                          }
                        } else if (x.discountPercentage) {
                          calVal = model.exShowroomPrice ? (model.exShowroomPrice - model.exShowroomPrice * (x.discountPercentage / 100)) : null;

                          /* Calculate tax & Total price if any offer */
                          if (this.countryCode === countryCodes.japan) {
                            model.totalTaxes = calVal + model.taxes;
                          }
                        }
                        if (x.applyToOfferTag) {
                          model.applyToOfferTag = x.applyToOfferTag;
                          model.textOnOfferTag = x.textOnOfferTag;
                        }
                        if (x.applyToDisclamer) {
                          model.applyToDisclamer = x.applyToDisclamer;
                        }

                        model.offerPrice = this.countryCode === countryCodes.japan ? (model.totalTaxes) : calVal;
                        model.offerId = x.id;
                  }
              }
          }
      });
    }
  }

}



