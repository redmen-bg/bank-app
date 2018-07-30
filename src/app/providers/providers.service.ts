import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { PROVIDERS_URL, APP_ID } from '../shared/config';

@Injectable()
export class ProviderService {
    accessToken;
    constructor(private http: HttpClient) {}

      getProviders(code: string) {

        let headers = new HttpHeaders();
        this.accessToken = code;
        if (code) {
          headers = headers.set('Authorization', 'Bearer ' + code);
          headers = headers.set('Accept', 'application/json');
          headers = headers.set('app_id', APP_ID);
        }
        const requestOptions = {
          headers: headers
        };
        return this.http.get(PROVIDERS_URL, requestOptions );
      }
      getUrl(providerId: string) {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.accessToken);
        headers = headers.set('Accept', 'application/json');
        const requestOptions = {
          headers: headers
        };
        return this.http.get('https://api-sandbox.fintecture.com/provider/' + providerId + '/auth', requestOptions );
      }
}
