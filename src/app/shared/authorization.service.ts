import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders,  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserAccount } from './userAccount.model';
import { APP_ID, APP_SECRET, AUTHORIZE_URL, ACCESS_TOKEN_URL } from '../shared/config';

@Injectable()
export class AuthorizationService {
    accessToken;
    constructor(private http: HttpClient) {}
    authorize() {
        window.location.href = AUTHORIZE_URL;
    }
    authenticate(authCode: string) {
        let clientToken: string;
        clientToken = btoa(APP_ID + ':' + APP_SECRET);
        let headers = new HttpHeaders();
        const body = new HttpParams()
        .set(`code`, authCode)
        .set(`grant_type`, `authorization_code`);
        headers = headers.set('Authorization', 'Basic ' + clientToken);
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.set('Accept', 'application/json');
        const requestOptions = {
          headers: headers
        };
        this.http.post(ACCESS_TOKEN_URL, body, requestOptions )
        .subscribe((data: any) => {
            // this.accessToken = data.access_token;
            localStorage.setItem ('access_token', data.access_token);
          }, error => {
            alert('error retrieving the access token');
          });
      }
      getAccs(customerId: string) {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        headers = headers.set('Accept', 'application/json');
        const requestOptions = {
          headers: headers
        };
        return this.http.get('https://api-sandbox.fintecture.com/ais/v1/customer/' + customerId + '/accounts/')
          .pipe(map ((data: any) => data.data[0].attributes));
      }
}
