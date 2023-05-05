import { Injectable } from '@angular/core';
import { COUNTRY } from 'environments/in/environment.dev';
declare var gtag: Function; // <-- Here we declare GA variable
declare var epaas: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() {
  }

  sendEvent(eventName, eventData) {
    if(COUNTRY.COUNTRY_CODE !== 'in_mini' && COUNTRY.COUNTRY_CODE !== 'indo') {
      if(epaas && epaas.api.isUsageAllowed('GoogleAnalytics')){
        gtag('event', eventName, eventData);
      }
    } else {
      gtag('event', eventName, eventData);
    }
  }
}

