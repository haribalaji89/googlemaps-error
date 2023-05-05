import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseHttpService } from '../base-http.service';

/**
 * Name: ChatbotService
 * params: HttpClient
 * basepath: chatbot
 * desc: Chatbot related services should be accessing this service
 */

@Injectable({
  providedIn: 'root'
})
export class ChatbotService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super(http, 'chatbot/message');
   }

}


