import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseHttpService } from '../base-http.service';

/**
 * Name: ChatService
 * params: HttpClient
 * basepath: bmw/chat/v1
 * desc: Chat related services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'chat/v1');
   }

}

