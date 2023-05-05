import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'environments/in/environment.dev';


import { GeneralService } from './services/generic/general.service';

import { SecuredService } from './services/generic/secured.service';
import { UserService } from './services/generic/user.service';
import { StorageService } from './services/storage.service';
import { GoogleAnalyticsService } from './services/generic/google.analytics.service';
import { CartService } from './services/generic/cart.service';
import { RfqService } from './services/generic/rfq.service';
import { OrderService } from './services/generic/order.service';
import { StockLocatorService } from './services/generic/stock-locator.service';
import { DreamCarsService } from './services/generic/dream-cars.service';
import{UserRegistrationService} from './services/generic/user-registration.service';
import{ UrlService } from './services/url.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.i18n_LOCATION, '.json');
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    GeneralService,
    SecuredService,
    UserService,
    StorageService,
    GoogleAnalyticsService,
    DatePipe,
    DecimalPipe,
    CartService,
    RfqService,
    OrderService,
    StockLocatorService,
    DreamCarsService,
    UserRegistrationService,
    UrlService
  ],
  exports: []
})
export class CoreModule {}
