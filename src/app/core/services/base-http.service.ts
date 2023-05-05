import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { COUNTRY,environment } from 'environments/in/environment.dev';
import { countryInformation } from '@shared/constants/app.constants';  


const {
  SERVER_API_URL,
  CHAT_SERVER_URL
} = environment;

export class BaseHttpService {

  public countryCode = COUNTRY.COUNTRY_CODE;
  constructor(
    private httpClient: HttpClient,
    private basePath: string ) { }

    public get(segment?: string, options?: any): Observable<any> {
       if (!options) {
        options = { params: { lang:  countryInformation[this.countryCode].langCode } };
      } else if (options && options["params"]) {
        options["params"]["lang"] = countryInformation[this.countryCode].langCode;
      }
      return this.httpClient.get(`${SERVER_API_URL}/${this.basePath}${segment ? '/' + segment : ''}`, options);
    }

    public post(item, segment?: string, options?: object): Observable<any> {
       if (!options) {
         options = { params: { lang:  countryInformation[this.countryCode].langCode } };
       } else if (options && options["params"]) {
         options["params"]["lang"] = countryInformation[this.countryCode].langCode;
       }
      return this.httpClient.post(`${SERVER_API_URL}/${this.basePath}${segment ? '/' + segment : ''}`, item, options);
    }

    public update(item, segment?: string): Observable<any> {
      return this.httpClient.put(`${SERVER_API_URL}/${this.basePath}${segment ? '/' + segment : ''}`, item);
    }

    public getByID(id: number): Observable<any> {
      return this.httpClient.get(`${SERVER_API_URL}/${this.basePath}/${id}`);
    }

    public delete(id: number): Observable<any> {
      return this.httpClient.delete(`${SERVER_API_URL}/${this.basePath}/${id}`);
    }

    public deleteWithBody(item, segment?: string): Observable<any> {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: item,
      };
      return this.httpClient.delete(`${SERVER_API_URL}/${this.basePath}${segment ? '/' + segment : ''}`, options);
    }

    public getExternal(url): Observable<any> {
      return this.httpClient.get(url);
    }

    public postExternal(url, item): Observable<any> {
      return this.httpClient.post(url, item);
    }

    public postFormData(item, segment): Observable<any> {
      return this.httpClient.post(`${SERVER_API_URL}${segment ? '/' + segment : ''} `, item, {
                                        headers: new HttpHeaders({
                                                  'Content-type': 'application/x-www-form-urlencoded'
                                                })
                                      });
    }

    public executeDownload(segment: string, options?) {
      return this.httpClient.get(`${SERVER_API_URL}/${this.basePath}${segment ? '/' + segment : ''}`, {
        params: options,
        responseType: 'blob', observe: 'response'
    });
    }

    /*SMOSS-36894-API to download images/PDF from s3 bucket for Invoice/Quotes
    It accepts the s3 file path,file name and file type as request body*/
    public downloadDocument(segment: string,reqObj): Observable<any> {
      const url:any = `${SERVER_API_URL}/${this.basePath}${segment ? '/' + segment : ''}`;
       return this.httpClient.post(url,reqObj);
    }

    public downloadSummaryPdf(item, segment?: string, options?) {
     return this.httpClient.post(`${SERVER_API_URL}/${this.basePath}${segment ? '/' + segment : ''}`, item, {
        params: options,
        responseType: 'blob', observe: 'response'
    });
    }


}
