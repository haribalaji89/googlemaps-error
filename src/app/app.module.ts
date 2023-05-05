import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmitterService } from '@core/services/emitter.service';
import { InterceptorService } from '@core/services/interceptors/http.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AgmDirectionModule } from 'agm-direction';

/*@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
  apiKey: string = gmConfig.gMaps;
}*/

//console.log(gmConfig.gMaps);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey : 'test'
    }),
    AgmDirectionModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    EmitterService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
